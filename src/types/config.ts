/**
 * @file Config options
 */

import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { ESLintPluginCommandOptions } from 'eslint-plugin-command/types'
import type { ParserOptions, TypedConfigItem } from './eslint'

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

export type ConfigGitIgnoreOptions = FlatGitignoreOptions

export type ConfigCommandOptions = ESLintPluginCommandOptions

export interface ConfigJsdocOptions extends OptionsOverrides {}

export interface ConfigUnoCSSOptions extends OptionsOverrides {}

export interface ConfigUnicornOptions extends OptionsOverrides {}

export interface ConfigImportsOptions extends OptionsOverrides {}

export interface ConfigNodeOptions extends OptionsOverrides {}

export interface ConfigAntfuOptions extends OptionsOverrides {}

export interface ConfigNtnyqOptions extends OptionsOverrides {}

export interface ConfigPrettierOptions extends OptionsOverrides {
  /**
   * Prettier level
   *
   * @default 'warn'
   */
  level?: 'warn' | 'error'
}

export type PerfectionistSortType = 'alphabetical' | 'line-length' | 'natural'
export type PerfectionistSortOrder = 'asc' | 'desc'

export interface ConfigPerfectionistOptions extends OptionsOverrides {
  imports?: {
    type?: PerfectionistSortType
    order?: PerfectionistSortOrder
  }
  exports?: {
    type?: PerfectionistSortType
    order?: PerfectionistSortOrder
  }
  namedExports?: {
    type?: PerfectionistSortType
    order?: PerfectionistSortOrder
  }
  namedImports?: {
    type?: PerfectionistSortType
    order?: PerfectionistSortOrder
  }
}

export interface ConfigCommentsOptions extends OptionsOverrides {}

export interface ConfigRegexpOptions extends OptionsOverrides {}

export interface ConfigJavaScriptOptions extends OptionsOverrides {
  /**
   * Enable strict checking for JavaScript files
   *
   * @default false
   */
  strict?: boolean
}

export interface ConfigTypeScriptOptions extends OptionsOverrides {
  /**
   * Enable type aware check for TypeScript files
   */
  tsconfigPath?: string

  /**
   * Additional parser options
   */
  parserOptions?: Partial<ParserOptions>
}

export interface ConfigSortOptions {
  /**
   * @default true
   */
  tsconfig?: boolean

  /**
   * @default true
   */
  packageJson?: boolean

  /**
   * @default true
   */
  i18nLocale?: boolean
}

export interface ConfigJsoncOptions extends OptionsOverrides {}

export interface ConfigYmlOptions extends OptionsOverrides {}

export interface ConfigMarkdownOptions extends OptionsOverrides {}

export interface ConfigTomlOptions extends OptionsOverrides {}

export interface ConfigVueOptions extends OptionsOverrides {
  /**
   * Vue version
   *
   * @default 3
   */
  vueVersion?: 2 | 3
}

export interface ConfigTestOptions extends OptionsOverrides {
  /**
   * Rules for vitest
   */
  overridesVitestRules?: TypedConfigItem['rules']
}

export interface ConfigUnusedImportsOptions extends OptionsOverrides {}

/**
 * Config factory options
 */
export interface ConfigOptions {
  ignores?: ConfigIgnoresOptions

  sort?: boolean | ConfigSortOptions

  command?: boolean | ConfigCommandOptions

  gitignore?: boolean | ConfigGitIgnoreOptions

  imports?: ConfigImportsOptions

  node?: ConfigNodeOptions

  javascript?: ConfigJavaScriptOptions

  typescript?: boolean | ConfigTypeScriptOptions

  unicorn?: boolean | ConfigUnicornOptions

  prettier?: boolean | ConfigPrettierOptions

  perfectionist?: boolean | ConfigPerfectionistOptions

  /**
   * @internal
   */
  unusedImports?: boolean | ConfigUnusedImportsOptions

  /**
   * @internal
   */
  antfu?: boolean | ConfigAntfuOptions

  /**
   * @internal
   */
  ntnyq?: boolean | ConfigNtnyqOptions

  comments?: boolean | ConfigCommentsOptions

  jsdoc?: boolean | ConfigJsdocOptions

  unocss?: boolean | ConfigUnoCSSOptions

  regexp?: boolean | ConfigRegexpOptions

  jsonc?: boolean | ConfigJsoncOptions

  yml?: boolean | ConfigYmlOptions

  markdown?: boolean | ConfigMarkdownOptions

  toml?: boolean | ConfigTomlOptions

  vue?: boolean | ConfigVueOptions

  test?: boolean | ConfigTestOptions
}
