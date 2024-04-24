/**
 * @file presets
 */

import { defineFlatConfig } from 'eslint-define-config'
import { hasUnoCSS, hasVue } from './env'
import {
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  jsx,
  markdown,
  node,
  prettier,
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
 * JavaScript preset
 */
export const presetJavaScript = [
  ...ignores,
  ...jsdoc,
  ...jsx,
  ...node,
  ...imports,
  ...unicorn,
  ...comments,
  ...javascript,
]

/**
 * JavaScript & TypeScript
 */
export const presetBasic = [...presetJavaScript, ...typescript]

/**
 * JSON and sort json keys
 */
export const presetJsonc = [...jsonc, ...sortPackageJson, ...sortTsConfig]

/**
 * JSON YAML Markdown
 */
export const presetLanguageExtensions = [...presetJsonc, ...yml, ...markdown]

// No framework
export const presetCommon = [...presetBasic, ...presetLanguageExtensions, ...prettier]

/**
 * All supported framework
 */
export const presetAll = [...presetCommon, ...vue, ...unocss]

/**
 * Custom framework support
 */
export function ntnyq(
  config: FlatESLintConfig | FlatESLintConfig[] = [],
  {
    vue: enableVue = hasVue,
    unocss: enableUnoCSS = hasUnoCSS,
    prettier: enablePrettier = true,
    markdown: enableMarkdown = true,
  } = {},
) {
  const configs = defineFlatConfig([...presetBasic, ...yml, ...presetJsonc])

  if (enableVue) {
    configs.push(...vue)
  }
  if (enableUnoCSS) {
    configs.push(...unocss)
  }
  if (enablePrettier) {
    configs.push(...prettier)
  }
  if (enableMarkdown) {
    configs.push(...markdown)
  }

  if (Object.keys(config).length > 0) {
    configs.push(...(Array.isArray(config) ? config : [config]))
  }

  return configs
}
