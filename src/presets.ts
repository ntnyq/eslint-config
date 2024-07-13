/**
 * @file presets
 */

import { defineConfig, hasUnoCSS, hasVue } from './utils'
import {
  command,
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
  regexp,
  sortPackageJson,
  sortTsConfig,
  toml,
  typescript,
  unicorn,
  unocss,
  vue,
  yml,
} from './configs'
import type { TypedConfigItem } from './types'

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
  ...regexp,
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
export const presetLanguageExtensions = [...presetJsonc, ...yml, ...toml, ...markdown]

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
  config: TypedConfigItem | TypedConfigItem[] = [],
  {
    vue: enableVue = hasVue,
    unocss: enableUnoCSS = hasUnoCSS,
    prettier: enablePrettier = true,
    markdown: enableMarkdown = true,
    command: enableCommand = true,
  } = {},
) {
  const configs = defineConfig([...presetBasic, ...yml, ...toml, ...presetJsonc])

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
  if (enableCommand) {
    configs.push(...command)
  }

  if (Object.keys(config).length > 0) {
    configs.push(...(Array.isArray(config) ? config : [config]))
  }

  return configs
}
