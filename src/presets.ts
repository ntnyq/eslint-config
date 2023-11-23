/**
 * @file presets
 */

import { defineFlatConfig } from 'eslint-define-config'
import {
  astro,
  comments,
  ignores,
  imports,
  javascript,
  jsonc,
  jsx,
  markdown,
  node,
  prettier,
  react,
  sortPackageJson,
  sortTsConfig,
  typescript,
  unicorn,
  unocss,
  vue,
  yml,
} from './configs'
import type { FlatESLintConfig } from 'eslint-define-config'

/**
 * only js and ts
 */
export const basic = defineFlatConfig([
  ...ignores,
  ...javascript,
  ...jsx,
  ...node,
  ...typescript,
  ...imports,
  ...unicorn,
  ...comments,
])

// no framework
export const common = defineFlatConfig([
  ...basic,
  ...yml,
  ...jsonc,
  ...sortPackageJson,
  ...sortTsConfig,
  ...prettier,
  ...markdown,
])

/**
 * all supported framework
 */
export const all = defineFlatConfig([...common, ...vue, ...react, ...astro, ...unocss])

/**
 * custom framework support
 */
export function ntnyq(
  config: FlatESLintConfig | FlatESLintConfig[] = [],
  {
    vue: enableVue = false,
    react: enableReact = false,
    astro: enableAstro = false,
    unocss: enableUnoCSS = false,
  } = {},
) {
  const configs = defineFlatConfig([...common])

  if (enableVue) {
    configs.push(...vue)
  }
  if (enableReact) {
    configs.push(...react)
  }
  if (enableAstro) {
    configs.push(...astro)
  }
  if (enableUnoCSS) {
    configs.push(...unocss)
  }

  if (Object.keys(config).length > 0) {
    configs.push(...(Array.isArray(config) ? config : [config]))
  }

  return configs
}
