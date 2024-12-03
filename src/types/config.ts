/**
 * @file Config options
 */

import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { ESLintPluginCommandOptions } from 'eslint-plugin-command/types'
import type { RecommendedOptions as GitHubActionRecommendedOptions } from 'eslint-plugin-github-action'
import type { Options as VueBlocksOptions } from 'eslint-processor-vue-blocks'
import type { PrettierOptions } from '../types'
import type { TSESLintParserOptions, TypedConfigItem } from './eslint'

export type ConfigIgnoresOptions = string[]

/**
 * Options for overrides `files`
 */
export type ConfigCommandOptions = ESLintPluginCommandOptions

export interface ConfigYmlOptions extends OptionsOverrides {}

export interface OptionsFiles {
  files?: string[]
}

/**
 * Options for add `extensions` support
 */
export interface ConfigAntfuOptions extends OptionsOverrides {}

export interface ConfigCommentsOptions extends OptionsOverrides {}

export interface ConfigGitHubActionOptions
  extends GitHubActionRecommendedOptions,
    OptionsOverrides {}

export interface ConfigImportXOptions extends OptionsOverrides {}

export interface ConfigJsdocOptions extends OptionsFeatures, OptionsOverrides {}

export interface ConfigJsoncOptions extends OptionsOverrides {}

export interface ConfigNodeOptions extends OptionsOverrides {}

export interface ConfigNtnyqOptions extends OptionsOverrides {}

export interface ConfigStylisticOptions extends OptionsOverrides {}

export interface ConfigTomlOptions extends OptionsOverrides {}

export interface ConfigUnicornOptions extends OptionsOverrides {}

export interface ConfigUnusedImportsOptions extends OptionsOverrides {}

export interface OptionsExtensions {
  extensions?: string[]
}

/**
 * Options for add `features` support
 */
export interface ConfigMarkdownOptions extends OptionsExtensions, OptionsFiles, OptionsOverrides {}

export type OptionsFeatures = {
  /**
   * Enable typescript support
   */
  typescript?: boolean
}

/**
 * Options for overrides `rules`
 */
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
  markdown?: 'dprint' | 'prettier' | boolean

  /**
   * Options for prettier
   */
  prettierOptions?: PrettierOptions

  /**
   * Options for dprint
   */
  dprintOptions?: boolean
}

export type ConfigGitIgnoreOptions = Omit<FlatGitignoreOptions, 'strict'> & {
  /**
   * Throw an error if gitignore file not found.
   *
   * @default false
   */
  strict?: boolean
}

export interface ConfigJavaScriptOptions extends OptionsOverrides {
  /**
   * Enable strict checking for JavaScript files
   *
   * @default false
   */
  strict?: boolean
}

export interface ConfigPerfectionistOptions extends OptionsOverrides {
  /**
   * Enable sort `constants`
   *
   * @default true
   */
  sortConstants?: boolean

  /**
   * Enable sort `enums`
   *
   * @default true
   */
  sortEnums?: boolean

  /**
   * Enable sort `types`
   *
   * @default true
   */
  sortTypes?: boolean

  /**
   * Overrides rules for `constants`
   */
  overridesConstantsRules?: TypedConfigItem['rules']

  /**
   * Overrides rules for `enums`
   */
  overridesEnumsRules?: TypedConfigItem['rules']

  /**
   * Overrides rules for `types`
   */
  overridesTypesRules?: TypedConfigItem['rules']
}

export interface ConfigPrettierOptions extends OptionsOverrides {
  /**
   * Prettier level
   *
   * @default 'warn'
   */
  level?: 'error' | 'warn'

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

export interface ConfigRegexpOptions extends OptionsOverrides {
  /**
   * Prettier level
   *
   * @default 'error'
   */
  level?: 'error' | 'warn'
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

export interface ConfigSpecialsOptions {
  /**
   * Overrides scripts rules
   */
  overridesScriptsRules?: TypedConfigItem['rules']

  /**
   * Overrides cli rules
   */
  overridesCliRules?: TypedConfigItem['rules']

  /**
   * Overrides user scripts rules
   */
  overridesUserScriptsRules?: TypedConfigItem['rules']

  /**
   * Overrides config files rules
   */
  overridesConfigFileRules?: TypedConfigItem['rules']

  /**
   * More special case configs
   */
  specialCaseConfigs?: TypedConfigItem[]
}

export interface ConfigTestOptions extends OptionsOverrides {
  /**
   * Overrides built-in vitest rules
   */
  overridesVitestRules?: TypedConfigItem['rules']
}

export interface ConfigTypeScriptOptions extends OptionsExtensions, OptionsFiles, OptionsOverrides {
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

export interface ConfigUnoCSSOptions extends OptionsOverrides {
  /**
   * Enable attributify sort order
   *
   * @default false
   */
  attributify?: boolean
}

export interface ConfigVueOptions extends OptionsFeatures, OptionsFiles, OptionsOverrides {
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

export interface OptionsOverrides<
  Rules extends TypedConfigItem['rules'] = TypedConfigItem['rules'],
> {
  overrides?: Rules
}

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
export interface ConfigOptions extends ConfigOptionsInternal, OptionsExtensions {
  command?: ConfigCommandOptions
  comments?: ConfigCommentsOptions
  ignores?: ConfigIgnoresOptions
  importX?: ConfigImportXOptions
  javascript?: ConfigJavaScriptOptions
  jsdoc?: ConfigJsdocOptions
  node?: ConfigNodeOptions
  specials?: ConfigSpecialsOptions

  /**
   * bellow can be disabled
   */
  antfu?: boolean | ConfigAntfuOptions
  githubAction?: boolean | ConfigGitHubActionOptions
  gitignore?: boolean | ConfigGitIgnoreOptions
  jsonc?: boolean | ConfigJsoncOptions
  markdown?: boolean | ConfigMarkdownOptions
  perfectionist?: boolean | ConfigPerfectionistOptions
  prettier?: boolean | ConfigPrettierOptions
  regexp?: boolean | ConfigRegexpOptions
  sort?: boolean | ConfigSortOptions
  stylistic?: boolean | ConfigStylisticOptions
  test?: boolean | ConfigTestOptions
  toml?: boolean | ConfigTomlOptions
  typescript?: boolean | ConfigTypeScriptOptions
  unicorn?: boolean | ConfigUnicornOptions
  unocss?: boolean | ConfigUnoCSSOptions
  vue?: boolean | ConfigVueOptions
  yml?: boolean | ConfigYmlOptions
}
