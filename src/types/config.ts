/**
 * @file Config options
 */

import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { ESLintPluginCommandOptions } from 'eslint-plugin-command/types'
import type { Options as VueBlocksOptions } from 'eslint-processor-vue-blocks'
import type { PrettierOptions } from '../types'
import type { TSESLintParserOptions, TypedConfigItem } from './eslint'

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

export type ConfigGitIgnoreOptions = Omit<FlatGitignoreOptions, 'strict'> & {
  /**
   * Throw an error if gitignore file not found.
   *
   * @default false
   */
  strict?: boolean
}

export type ConfigCommandOptions = ESLintPluginCommandOptions

export interface ConfigJsdocOptions extends OptionsOverrides {}

export interface ConfigUnoCSSOptions extends OptionsOverrides {
  /**
   * Enable attributify sort order
   *
   * @default false
   */
  attributify?: boolean
}

export interface ConfigUnicornOptions extends OptionsOverrides {}

export interface ConfigImportsOptions extends OptionsOverrides {}

export interface ConfigNodeOptions extends OptionsOverrides {}

export interface ConfigAntfuOptions extends OptionsOverrides {}

export interface ConfigNtnyqOptions extends OptionsOverrides {}

export interface ConfigStylisticOptions extends OptionsOverrides {}

export interface ConfigGitHubActionOptions extends OptionsOverrides {}

export interface ConfigPrettierOptions extends OptionsOverrides {
  /**
   * Prettier level
   *
   * @default 'warn'
   */
  level?: 'warn' | 'error'

  /**
   * Glob of built-in disabled files
   */
  disabledFiles?: string[]

  /**
   * Glob of user custom disabled files
   * @default []
   */
  userDisabledFiles?: string[]
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

export interface ConfigRegexpOptions extends OptionsOverrides {
  /**
   * Prettier level
   *
   * @default 'error'
   */
  level?: 'warn' | 'error'
}

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
  parserOptions?: TSESLintParserOptions

  /**
   * Glob patterns for files that should be type aware.
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[]

  /**
   * Glob patterns for files that should not be type aware.
   * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
   */
  ignoresTypeAware?: string[]

  /**
   * Overrides built-in type aware rules
   */
  overridesTypeAwareRules?: TypedConfigItem['rules']
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

  /**
   * @default true
   */
  pnpmWorkspace?: boolean
}

export interface ConfigJsoncOptions extends OptionsOverrides {}

export interface ConfigYmlOptions extends OptionsOverrides {}

export interface ConfigMarkdownOptions extends OptionsOverrides {}

export interface ConfigTomlOptions extends OptionsOverrides {}

export interface ConfigVueOptions extends OptionsOverrides {
  /**
   * Create virtual files for Vue SFC blocks to enable linting.
   *
   * @see https://github.com/antfu/eslint-processor-vue-blocks
   * @default true
   */
  sfcBlocks?: boolean | VueBlocksOptions

  /**
   * Vue version
   *
   * @default 3
   */
  vueVersion?: 2 | 3
}

export interface ConfigTestOptions extends OptionsOverrides {
  /**
   * Overrides built-in vitest rules
   */
  overridesVitestRules?: TypedConfigItem['rules']
}

export interface ConfigFormatOptions {
  /**
   * Enable formatter support for css, less, scss, sass and etc.
   *
   * @default 'prettier'
   */
  css?: 'prettier' | boolean

  /**
   * Enable formatter support for html
   *
   * @default 'prettier'
   */
  html?: 'prettier' | boolean

  /**
   * Enable formatter support for markdown
   *
   * @default 'prettier'
   */
  markdown?: 'prettier' | 'dprint' | boolean

  /**
   * Options for prettier
   */
  prettierOptions?: PrettierOptions

  /**
   * Options for dprint
   */
  dprintOptions?: boolean
}

export interface ConfigUnusedImportsOptions extends OptionsOverrides {}

interface ConfigOptionsInternal {
  /**
   * @internal
   */
  format?: boolean | ConfigFormatOptions

  /**
   * @internal
   */
  ntnyq?: boolean | ConfigNtnyqOptions

  /**
   * @internal
   */
  unusedImports?: boolean | ConfigUnusedImportsOptions
}

/**
 * Config factory options
 */
export interface ConfigOptions extends ConfigOptionsInternal {
  node?: ConfigNodeOptions

  jsdoc?: ConfigJsdocOptions

  ignores?: ConfigIgnoresOptions

  imports?: ConfigImportsOptions

  command?: ConfigCommandOptions

  comments?: ConfigCommentsOptions

  javascript?: ConfigJavaScriptOptions

  sort?: boolean | ConfigSortOptions

  gitignore?: boolean | ConfigGitIgnoreOptions

  stylistic?: boolean | ConfigStylisticOptions

  typescript?: boolean | ConfigTypeScriptOptions

  unicorn?: boolean | ConfigUnicornOptions

  prettier?: boolean | ConfigPrettierOptions

  perfectionist?: boolean | ConfigPerfectionistOptions

  unocss?: boolean | ConfigUnoCSSOptions

  regexp?: boolean | ConfigRegexpOptions

  jsonc?: boolean | ConfigJsoncOptions

  yml?: boolean | ConfigYmlOptions

  markdown?: boolean | ConfigMarkdownOptions

  toml?: boolean | ConfigTomlOptions

  vue?: boolean | ConfigVueOptions

  test?: boolean | ConfigTestOptions

  antfu?: boolean | ConfigAntfuOptions

  githubAction?: boolean | ConfigGitHubActionOptions
}
