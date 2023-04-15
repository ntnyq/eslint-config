/**
 * @file presets
 */
import {
  astro,
  eslintComments,
  imports,
  js,
  jsonc,
  jsx,
  markdown,
  pkgOrder,
  prettier,
  react,
  ts,
  unicorn,
  vue,
  yml,
} from './configs/index.js'
import { GLOB_EXCLUDE } from './shared.js'
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
  ...pkgOrder,
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
