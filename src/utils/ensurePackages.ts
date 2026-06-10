/**
 * @copyright {@link https://github.com/antfu/eslint-config}
 */

import process from 'node:process'
import { isPackageExists } from 'local-pkg'
import { isInGitHooksOrRunBySpecifyPackages } from './isInGitHooksOrRunBySpecifyPackages'

const isCwdInScope: boolean = isPackageExists('@ntnyq/eslint-config')

/**
 * Check whether a package can be resolved from this config package scope.
 */
function isPackageInScope(name: string): boolean {
  return isPackageExists(name, {
    paths: [import.meta.dirname],
  })
}

/**
 * Ensure required packages are installed for optional config features.
 *
 * Skips installation prompts in CI, non-TTY environments, git hooks, and
 * when the current project is outside the config usage scope.
 *
 * @param packages - Package names to verify and optionally install.
 */
export async function ensurePackages(
  packages: (string | undefined)[],
): Promise<void> {
  if (
    process.env.CI ||
    !process.stdout.isTTY ||
    isInGitHooksOrRunBySpecifyPackages() ||
    !isCwdInScope
  ) {
    return
  }

  const nonExistingPackages: string[] = packages.filter(
    pkg => !!pkg && !isPackageInScope(pkg),
  ) as string[]

  if (nonExistingPackages.length === 0) {
    return
  }

  const { confirm, isCancel } = await import('@clack/prompts')

  const confirmInstall: boolean | symbol = await confirm({
    message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
  })

  if (isCancel(confirmInstall) || confirmInstall !== true) {
    return
  }

  try {
    const { installPackage } = await import('@antfu/install-pkg')

    await installPackage(nonExistingPackages, { dev: true })
  } catch (error) {
    throw new Error(
      `Failed to install required packages: ${nonExistingPackages.join(', ')}`,
      {
        cause: error,
      },
    )
  }
}
