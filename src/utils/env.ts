import { resolve } from 'node:path'
import process from 'node:process'
import { isPackageExists } from 'local-pkg'

export const hasPinia = () => isPackageExists('pinia')
export const hasVitest = () => isPackageExists('vitest')
export const hasTypeScript = () => isPackageExists('typescript')

export const hasShadcnVue = () => isPackageExists('radix-vue') && isPackageExists('clsx')

export const hasUnoCSS = () =>
  isPackageExists('unocss') ||
  isPackageExists('@unocss/postcss') ||
  isPackageExists('@unocss/webpack') ||
  isPackageExists('@unocss/nuxt')

export const hasVue = () =>
  isPackageExists('vue') ||
  isPackageExists('nuxt') ||
  isPackageExists('vitepress') ||
  isPackageExists('vuepress') ||
  isPackageExists('@slidev/cli') ||
  isPackageExists('vue', {
    paths: [resolve(process.cwd(), 'playground'), resolve(process.cwd(), 'docs')],
  })
