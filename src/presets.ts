/**
 * @file presets
 */

import {
  astro,
  comments,
  ignores,
  imports,
  javascript,
  jsonOrder,
  jsonc,
  jsx,
  markdown,
  prettier,
  react,
  typescript,
  unicorn,
  unocss,
  vue,
  yml,
} from './configs'
import type { FlatESLintConfigItem } from 'eslint-define-config'

/**
 * only js and ts
 */
export const basic: FlatESLintConfigItem[] = [
  ...ignores,
  ...javascript,
  ...jsx,
  ...typescript,
  ...imports,
  ...unicorn,
  ...comments,
]

// no framework
export const common: FlatESLintConfigItem[] = [
  ...basic,
  ...yml,
  ...jsonc,
  ...jsonOrder,
  ...prettier,
  ...markdown,
]

/**
 * all supported framework
 */
export const all: FlatESLintConfigItem[] = [...common, ...vue, ...react, ...astro, ...unocss]

/**
 * custom framework support
 */
export function ntnyq(
  config: FlatESLintConfigItem | FlatESLintConfigItem[] = [],
  {
    vue: enableVue = false,
    react: enableReact = false,
    astro: enableAstro = false,
    unocss: enableUnoCSS = false,
  } = {},
) {
  const configs: FlatESLintConfigItem[] = [...common]

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
