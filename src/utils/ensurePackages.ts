/**
 * @copyright {@link https://github.com/antfu/eslint-config}
 */

import process from 'node:process'
import { isPackageExists } from 'local-pkg'
import { isInGitHooksOrRunBySpecifyPackages } from './isInGitHooksOrRunBySpecifyPackages'

const isCwdInScope: boolean = isPackageExists('@ntnyq/eslint-config')

let installationQueue = Promise.resolve()

/**
 * Check whether a package can be resolved from this config package scope.
 */
function isPackageInScope(name: string): boolean {
  return isPackageExists(name, {
    paths: [import.meta.dirname],
  })
}

function getMissingPackages(packages: (string | undefined)[]): string[] {
  return packages.filter(
    (pkg): pkg is string => !!pkg && !isPackageInScope(pkg),
  )
}

/**
 * Ensure required packages are installed for optional config features.
 *
 * Skips installation prompts in CI, non-TTY environments, git hooks, and
 * when the current project is outside the config usage scope.
 *
 * @param packages - Package names to verify and optionally install.
 */
export async function ensurePackages(packages: (string | undefined)[]) {
  if (
    process.env.CI ||
    !process.stdout.isTTY ||
    isInGitHooksOrRunBySpecifyPackages() ||
    !isCwdInScope ||
    getMissingPackages(packages).length === 0
  ) {
    return
  }

  const installation = installationQueue.then(async () => {
    const missingPackages = getMissingPackages(packages)

    if (missingPackages.length === 0) {
      return
    }

    const { confirm, isCancel } = await import('@clack/prompts')

    const confirmInstall: boolean | symbol = await confirm({
      message: `${missingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${missingPackages.join(', ')}. Do you want to install them?`,
    })

    if (isCancel(confirmInstall) || !confirmInstall) {
      return
    }

    try {
      const { installPackage } = await import('@antfu/install-pkg')

      await installPackage(missingPackages, { dev: true })
    } catch (error) {
      throw new Error(
        `Failed to install required packages: ${missingPackages.join(', ')}`,
        { cause: error },
      )
    }
  })

  // Keep the queue moving while each caller still receives its own failure.
  installationQueue = installation.catch(() => undefined)

  await installation
}
