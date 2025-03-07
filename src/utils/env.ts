import { resolve } from 'node:path'
import process from 'node:process'
import { isPackageExists } from 'local-pkg'

type ExistChecker = () => boolean

export const hasPinia: ExistChecker = () => isPackageExists('pinia')
export const hasVitest: ExistChecker = () => isPackageExists('vitest')
export const hasTypeScript: ExistChecker = () => isPackageExists('typescript')

export const hasShadcnVue: ExistChecker = () =>
  isPackageExists('radix-vue') && isPackageExists('clsx')

export const hasUnoCSS: ExistChecker = () =>
  isPackageExists('unocss')
  || isPackageExists('@unocss/postcss')
  || isPackageExists('@unocss/webpack')
  || isPackageExists('@unocss/nuxt')

export const hasVue: ExistChecker = () =>
  isPackageExists('vue')
  || isPackageExists('nuxt')
  || isPackageExists('vitepress')
  || isPackageExists('vuepress')
  || isPackageExists('@slidev/cli')
  || isPackageExists('vue', {
    paths: [
      resolve(process.cwd(), 'playground'),
      resolve(process.cwd(), 'docs'),
    ],
  })
