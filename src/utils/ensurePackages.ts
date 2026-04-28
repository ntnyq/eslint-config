/**
 * @copyright {@link https://github.com/antfu/eslint-config}
 */

import process from 'node:process'
import { isPackageExists } from 'local-pkg'
import { isInGitHooksOrRunBySpecifyPackages } from './isInGitHooksOrRunBySpecifyPackages'

const isCwdInScope: boolean = isPackageExists('@ntnyq/eslint-config')

function isPackageInScope(name: string): boolean {
  return isPackageExists(name, {
    paths: [import.meta.dirname],
  })
}

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
  } catch (err) {
    throw new Error(
      `Failed to install required packages: ${nonExistingPackages.join(', ')}`,
      {
        cause: err,
      },
    )
  }
}
