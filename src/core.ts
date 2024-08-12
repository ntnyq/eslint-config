/**
 * @file presets
 */

import { defineConfig, hasUnoCSS, hasVitest, hasVue } from './utils'
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
  vitest,
  vue,
  yml,
} from './configs'
import type { TypedConfigItem } from './types'

/**
 * Custom framework support
 */
export function ntnyq(
  config: TypedConfigItem | TypedConfigItem[] = [],
  {
    vue: enableVue = hasVue,
    unocss: enableUnoCSS = hasUnoCSS,
    vitest: enableVitest = hasVitest,
    prettier: enablePrettier = true,
    markdown: enableMarkdown = true,
    command: enableCommand = true,
  } = {},
) {
  const configs = defineConfig([
    /**
     * Basic
     */
    ...ignores,
    ...jsdoc,
    ...jsx,
    ...node,
    ...imports,
    ...unicorn,
    ...comments,
    ...javascript,
    ...regexp,
    ...typescript,

    /**
     * Language extensions
     */
    ...yml,
    ...toml,
    ...jsonc,
    ...sortPackageJson,
    ...sortTsConfig,
  ])

  if (enableVue) {
    configs.push(...vue)
  }
  if (enableVitest) {
    configs.push(...vitest)
  }
  if (enableUnoCSS) {
    configs.push(...unocss)
  }
  if (enableMarkdown) {
    configs.push(...markdown)
  }
  if (enableCommand) {
    configs.push(...command)
  }

  /**
   * Keep prettier at last
   */
  if (enablePrettier) {
    configs.push(...prettier)
  }

  if (Object.keys(config).length > 0) {
    configs.push(...(Array.isArray(config) ? config : [config]))
  }

  return configs
}
