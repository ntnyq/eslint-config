/**
 * @copyright {@link https://github.com/antfu/eslint-config}
 */

import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { isPackageExists } from 'local-pkg'
import { isInGitHooksOrRunByNanoStagedOrRunByTSX } from './isInGitHooksOrRunByNanoStagedOrRunByTSX'

const scopeUrl = fileURLToPath(new URL('.', import.meta.url))
const isCwdInScope = isPackageExists('@ntnyq/eslint-config')

function isPackageInScope(name: string): boolean {
  return isPackageExists(name, {
    paths: [scopeUrl],
  })
}

export async function ensurePackages(packages: (string | undefined)[]) {
  if (
    process.env.CI ||
    !process.stdout.isTTY ||
    isInGitHooksOrRunByNanoStagedOrRunByTSX() ||
    !isCwdInScope
  ) {
    return
  }

  const nonExistingPackages = packages.filter(pkg => !!pkg && isPackageInScope(pkg)) as string[]

  if (nonExistingPackages.length === 0) {
    return
  }

  const { confirm } = await import('@clack/prompts')

  const confirmInstall = await confirm({
    message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
  })

  if (confirmInstall) {
    try {
      const { installPackage } = await import('@antfu/install-pkg')

      await installPackage(nonExistingPackages, { dev: true })
    } catch (err) {
      console.log(err)
    }
  }
}
