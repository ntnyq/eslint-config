/**
 * @file presets
 */
import {
  astro,
  eslintComments,
  imports,
  js,
  jsonOrder,
  jsonc,
  jsx,
  markdown,
  prettier,
  react,
  ts,
  unicorn,
  unocss,
  vue,
  yml,
} from './configs'
import { GLOB_EXCLUDE } from './shared'
import type { FlatESLintConfig } from 'eslint-define-config'

/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
 */
const GLOBAL_IGNORE = { ignores: GLOB_EXCLUDE }

/**
 * only js and ts
 */
export const basic: FlatESLintConfig[] = [
  GLOBAL_IGNORE,
  ...js,
  ...jsx,
  ...ts,
  ...imports,
  ...unicorn,
  ...eslintComments,
]

// no framework
export const common: FlatESLintConfig[] = [
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
export const all: FlatESLintConfig[] = [...common, ...vue, ...react, ...astro, ...unocss]

/**
 * custom framework support
 */
export function ntnyq(
  config: FlatESLintConfig | FlatESLintConfig[] = [],
  {
    vue: enableVue = false,
    react: enableReact = false,
    astro: enableAstro = false,
    prettier: enablePrettier = false,
    markdown: enableMarkdown = false,
    unocss: enableUnoCSS = false,
  } = {},
) {
  const configs: FlatESLintConfig[] = [...basic]

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
  if (enableMarkdown) {
    configs.push(...markdown)
  }
  if (enablePrettier) {
    configs.push(...prettier)
  }

  if (Object.keys(config).length > 0) {
    configs.push(...(Array.isArray(config) ? config : [config]))
  }

  return configs
}
