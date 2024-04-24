import { isPackageExists } from 'local-pkg'

export const hasTypeScript = isPackageExists('typescript')

export const hasVue =
  isPackageExists('vue') ||
  isPackageExists('nuxt') ||
  isPackageExists('vitepress') ||
  isPackageExists('@slidev/cli')

export const hasUnoCSS =
  isPackageExists('unocss') || isPackageExists('@unocss/webpack') || isPackageExists('@unocss/nuxt')
