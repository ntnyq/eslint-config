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
 * no framework
 */
export const basic: FlatESLintConfig[] = [
  GLOBAL_IGNORE,
  ...js,
  ...jsx,
  ...ts,
  ...yml,
  ...imports,
  ...unicorn,
  ...jsonc,
  ...jsonOrder,
  ...eslintComments,
]

/**
 * all supported framework
 */
export const all: FlatESLintConfig[] = [
  ...basic,
  ...vue,
  ...react,
  ...astro,
  ...unocss,
  ...prettier,
  ...markdown,
]

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
