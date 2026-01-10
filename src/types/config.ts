/**
 * @file Config options
 */

import type {
  ConfigAntfuOptions,
  ConfigAstroOptions,
  ConfigCommandOptions,
  ConfigDeMorganOptions,
  ConfigDependOptions,
  ConfigESLintCommentsOptions,
  ConfigESLintPluginOptions,
  ConfigFormatOptions,
  ConfigGitHubActionOptions,
  ConfigGitIgnoreOptions,
  ConfigHtmlOptions,
  ConfigIgnoresOptions,
  ConfigImportXOptions,
  ConfigJavaScriptOptions,
  ConfigJsdocOptions,
  ConfigJsoncOptions,
  ConfigMarkdownOptions,
  ConfigNodeOptions,
  ConfigNtnyqOptions,
  ConfigOxfmtOptions,
  ConfigPerfectionistOptions,
  ConfigPiniaOptions,
  ConfigPnpmOptions,
  ConfigPrettierOptions,
  ConfigRegexpOptions,
  ConfigSortOptions,
  ConfigSpecialsOptions,
  ConfigSvelteOptions,
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
  javascript?: ConfigJavaScriptOptions
  node?: ConfigNodeOptions

  /**
   * Configs below can be disabled
   * @pg
   */
  antfu?: boolean | ConfigAntfuOptions
  astro?: boolean | ConfigAstroOptions
  deMorgan?: boolean | ConfigDeMorganOptions
  depend?: boolean | ConfigDependOptions
  eslintPlugin?: boolean | ConfigESLintPluginOptions
  githubAction?: boolean | ConfigGitHubActionOptions
  gitignore?: boolean | ConfigGitIgnoreOptions
  html?: boolean | ConfigHtmlOptions
  importX?: boolean | ConfigImportXOptions
  jsdoc?: boolean | ConfigJsdocOptions
  jsonc?: boolean | ConfigJsoncOptions
  markdown?: boolean | ConfigMarkdownOptions
  ntnyq?: boolean | ConfigNtnyqOptions
  oxfmt?: boolean | ConfigOxfmtOptions
  perfectionist?: boolean | ConfigPerfectionistOptions
  pinia?: boolean | ConfigPiniaOptions
  pnpm?: boolean | ConfigPnpmOptions
  prettier?: boolean | ConfigPrettierOptions
  regexp?: boolean | ConfigRegexpOptions
  sort?: boolean | ConfigSortOptions
  specials?: boolean | ConfigSpecialsOptions
  svelte?: boolean | ConfigSvelteOptions
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
