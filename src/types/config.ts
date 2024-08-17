/**
 * @file Config options
 */

import type { TypedConfigItem } from './eslint'

/**
 * Options for overrides `files`
 */
export interface OptionsFiles {
  files?: string[]
}

/**
 * Options for overrides `rules`
 */
export interface OptionsOverrides<
  Rules extends TypedConfigItem['rules'] = TypedConfigItem['rules'],
> {
  overrides?: Rules
}

export type ConfigIgnoresOptions = string[]

export interface ConfigJsdocOptions extends OptionsOverrides {}

export interface ConfigUnoCSSOptions extends OptionsOverrides {}

export interface ConfigUnicornOptions extends OptionsOverrides {}

export interface ConfigImportsOptions extends OptionsOverrides {}

export interface ConfigNodeOptions extends OptionsOverrides {}

export interface ConfigPrettierOptions extends OptionsOverrides {}

export interface ConfigPerfectionistOptions extends OptionsOverrides {}

export interface ConfigCommentsOptions extends OptionsOverrides {}

export interface ConfigRegexpOptions extends OptionsOverrides {}

export interface ConfigJavaScriptOptions extends OptionsOverrides {}

export interface ConfigTypeScriptOptions extends OptionsOverrides {}

export interface ConfigJsoncOptions extends OptionsOverrides {}

export interface ConfigYmlOptions extends OptionsOverrides {}

export interface ConfigMarkdownOptions extends OptionsOverrides {}

export interface ConfigTomlOptions extends OptionsOverrides {}

export interface ConfigVueOptions extends OptionsOverrides {}

export interface ConfigVitestOptions extends OptionsOverrides {}

export interface ConfigUnusedImportsOptions extends OptionsOverrides {}

/**
 * Config factory options
 */
export interface ConfigOptions {
  command?: boolean

  sortTsConfig?: boolean

  sortPackageJson?: boolean

  ignores?: ConfigIgnoresOptions

  imports?: ConfigImportsOptions

  javascript?: ConfigJavaScriptOptions

  typescript?: ConfigTypeScriptOptions

  node?: ConfigNodeOptions

  unicorn?: boolean | ConfigUnicornOptions

  prettier?: boolean | ConfigPrettierOptions

  /**
   * @internal
   */
  perfectionist?: boolean | ConfigPerfectionistOptions

  /**
   * @internal
   */
  unusedImports?: boolean | ConfigUnusedImportsOptions

  comments?: boolean | ConfigCommentsOptions

  jsdoc?: boolean | ConfigJsdocOptions

  unocss?: boolean | ConfigUnoCSSOptions

  regexp?: boolean | ConfigRegexpOptions

  jsonc?: boolean | ConfigJsoncOptions

  yml?: boolean | ConfigYmlOptions

  markdown?: boolean | ConfigMarkdownOptions

  toml?: boolean | ConfigTomlOptions

  vue?: boolean | ConfigVueOptions

  vitest?: boolean | ConfigVitestOptions
}
