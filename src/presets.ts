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

export const basic: FlatESLintConfig[] = [
  { ignores: GLOB_EXCLUDE },
  ...js,
  ...jsx,
  ...ts,
  ...vue,
  ...yml,
  ...imports,
  ...unicorn,
  ...jsonc,
  ...pkgOrder,
  ...markdown,
  ...eslintComments,
]

export const all: FlatESLintConfig[] = [...vue, ...react, ...astro, ...basic, ...prettier]

export function ntnyq(
  config: FlatESLintConfig | FlatESLintConfig[] = [],
  {
    vue: enableVue = true,
    react: enableReact = true,
    astro: enableAstro = true,
    prettier: enablePrettier = true,
    markdown: enableMarkdown = true,
  } = {},
) {
  const configs: FlatESLintConfig[] = [...basic]

  if (enableVue !== false) {
    configs.push(...vue)
  }
  if (enableReact !== false) {
    configs.push(...react)
  }
  if (enableAstro !== false) {
    configs.push(...astro)
  }
  if (enableMarkdown !== false) {
    configs.push(...markdown)
  }
  if (enablePrettier !== false) {
    configs.push(...prettier)
  }

  if (Object.keys(config).length > 0) {
    configs.push(...(Array.isArray(config) ? config : [config]))
  }

  return configs
}
