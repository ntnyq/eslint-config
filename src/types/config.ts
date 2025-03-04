/**
 * @file Config options
 */

import type {
  ConfigAntfuOptions,
  ConfigCommandOptions,
  ConfigDeMorganOptions,
  ConfigDependOptions,
  ConfigESLintCommentsOptions,
  ConfigESLintPluginOptions,
  ConfigFormatOptions,
  ConfigGitHubActionOptions,
  ConfigGitIgnoreOptions,
  ConfigIgnoresOptions,
  ConfigImportXOptions,
  ConfigJavaScriptOptions,
  ConfigJsdocOptions,
  ConfigJsoncOptions,
  ConfigMarkdownOptions,
  ConfigNodeOptions,
  ConfigNtnyqOptions,
  ConfigPerfectionistOptions,
  ConfigPiniaOptions,
  ConfigPrettierOptions,
  ConfigRegexpOptions,
  ConfigSortOptions,
  ConfigSpecialsOptions,
  ConfigSVGOOptions,
  ConfigTestOptions,
  ConfigTomlOptions,
  ConfigTypeScriptOptions,
  ConfigUnicornOptions,
  ConfigUnoCSSOptions,
  ConfigUnusedImportsOptions,
  ConfigVueOptions,
  ConfigYmlOptions,
} from '../configs'
import type { OptionsShareable } from './options'

/**
 * Config factory options
 */
export interface ConfigOptions {
  /**
   * Shareable options
   */
  shareable?: OptionsShareable

  /**
   * Configs enabled by default
   * @pg
   */
  command?: ConfigCommandOptions
  eslintComments?: ConfigESLintCommentsOptions
  ignores?: ConfigIgnoresOptions
  importX?: ConfigImportXOptions
  javascript?: ConfigJavaScriptOptions
  jsdoc?: ConfigJsdocOptions
  node?: ConfigNodeOptions
  specials?: ConfigSpecialsOptions

  /**
   * Configs bellow can be disabled
   * @pg
   */
  antfu?: boolean | ConfigAntfuOptions
  deMorgan?: boolean | ConfigDeMorganOptions
  depend?: boolean | ConfigDependOptions
  eslintPlugin?: boolean | ConfigESLintPluginOptions
  githubAction?: boolean | ConfigGitHubActionOptions
  gitignore?: boolean | ConfigGitIgnoreOptions
  jsonc?: boolean | ConfigJsoncOptions
  markdown?: boolean | ConfigMarkdownOptions
  ntnyq?: boolean | ConfigNtnyqOptions
  perfectionist?: boolean | ConfigPerfectionistOptions
  pinia?: boolean | ConfigPiniaOptions
  prettier?: boolean | ConfigPrettierOptions
  regexp?: boolean | ConfigRegexpOptions
  sort?: boolean | ConfigSortOptions
  svgo?: boolean | ConfigSVGOOptions
  test?: boolean | ConfigTestOptions
  toml?: boolean | ConfigTomlOptions
  typescript?: boolean | ConfigTypeScriptOptions
  unicorn?: boolean | ConfigUnicornOptions
  unocss?: boolean | ConfigUnoCSSOptions
  vue?: boolean | ConfigVueOptions
  yml?: boolean | ConfigYmlOptions
}

/**
 * Not enabled for now, maybe later
 */
export interface ConfigOptionsInternal {
  format?: boolean | ConfigFormatOptions
  unusedImports?: boolean | ConfigUnusedImportsOptions
}
