import { resolve } from 'node:path'
import process from 'node:process'
import { isPackageExists } from 'local-pkg'

type ExistChecker = () => boolean

/**
 * Check whether Pinia is available in the current project.
 */
export const hasPinia: ExistChecker = () => isPackageExists('pinia')

/**
 * Check whether Vitest is available in the current project.
 */
export const hasVitest: ExistChecker = () => isPackageExists('vitest')

/**
 * Check whether TypeScript runtime or preview package is available.
 */
export const hasTypeScript: ExistChecker = () =>
  isPackageExists('typescript') || isPackageExists('@typescript/native-preview')

/**
 * Check whether shadcn-vue related dependencies are available.
 */
export const hasShadcnVue: ExistChecker = () =>
  (isPackageExists('radix-vue') || isPackageExists('reka-ui')) &&
  isPackageExists('class-variance-authority') &&
  isPackageExists('clsx')

/**
 * Check whether UnoCSS runtime packages are available.
 */
export const hasUnoCSS: ExistChecker = () =>
  isPackageExists('unocss') ||
  isPackageExists('@unocss/postcss') ||
  isPackageExists('@unocss/webpack') ||
  isPackageExists('@unocss/nuxt')

/**
 * Check whether Vue ecosystem packages are available.
 */
export const hasVue: ExistChecker = () =>
  isPackageExists('vue') ||
  isPackageExists('nuxt') ||
  isPackageExists('vitepress') ||
  isPackageExists('vuepress') ||
  isPackageExists('@slidev/cli') ||
  isPackageExists('vue', {
    paths: [
      resolve(process.cwd(), 'playground'),
      resolve(process.cwd(), 'docs'),
    ],
  })

/**
 * Check whether oxfmt is available in the current project.
 */
export const hasOxfmt: ExistChecker = () => isPackageExists('oxfmt')

/**
 * Check whether Prettier is available in the current project.
 */
export const hasPrettier: ExistChecker = () => isPackageExists('prettier')
