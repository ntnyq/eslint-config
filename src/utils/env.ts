import { resolve } from 'node:path'
import process from 'node:process'
import { isPackageExists } from 'local-pkg'

export const hasTypeScript = isPackageExists('typescript')

export const hasVitest = isPackageExists('vitest')

export const hasShadcnVue = isPackageExists('radix-vue') && isPackageExists('clsx')

export const hasVue =
  isPackageExists('vue') ||
  isPackageExists('nuxt') ||
  isPackageExists('vitepress') ||
  isPackageExists('@slidev/cli') ||
  isPackageExists('vue', {
    paths: [resolve(process.cwd(), 'playground')],
  })

export const hasPinia = isPackageExists('pinia')

export const hasUnoCSS =
  isPackageExists('unocss') ||
  isPackageExists('@unocss/postcss') ||
  isPackageExists('@unocss/webpack') ||
  isPackageExists('@unocss/nuxt')
