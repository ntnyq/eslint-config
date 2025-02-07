/**
 * @file Config options
 */

import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { ESLintPluginCommandOptions } from 'eslint-plugin-command/types'
import type { CreateConfigOptions as GitHubActionOptions } from 'eslint-plugin-github-action'
import type { RuleOptions as SVGORuleOptions } from 'eslint-plugin-svgo/rule-options'
import type { Options as VueBlocksOptions } from 'eslint-processor-vue-blocks'
import type { PerfectionistPartitionByComment, PrettierOptions } from '../types'
import type {
  ESLintConfig,
  ESLintRuleSeverity,
  TSESLintParserOptions,
  TypedConfigItem,
} from './eslint'
import type { OptionsExtensions, OptionsFeatures, OptionsFiles, OptionsOverrides } from './options'

export interface ConfigAntfuOptions extends OptionsOverrides {}

export type ConfigCommandOptions = ESLintPluginCommandOptions

export interface ConfigDependOptions extends OptionsFiles, OptionsOverrides {
  /**
   * Check deps in package.json
   *
   * @default true
   */
  packageJson?: boolean
}

export interface ConfigESLintCommentsOptions extends OptionsOverrides {}

export interface ConfigESLintPluginOptions extends OptionsOverrides {}

export interface ConfigFormatOptions {
  /**
   * Enable formatter support for css, less, scss, sass and etc.
   *
   * @default true
   */
  css?: boolean

  /**
   * Enable formatter support for html
   *
   * @default true
   */
  html?: boolean

  /**
   * Options for prettier
   */
  prettierOptions?: PrettierOptions
}

export interface ConfigGitHubActionOptions extends GitHubActionOptions, OptionsOverrides {}

export type ConfigGitIgnoreOptions = Omit<FlatGitignoreOptions, 'strict'> & {
  /**
   * Throw an error if gitignore file not found.
   *
   * @default false
   */
  strict?: boolean
}

export type ConfigIgnoresOptions = string[]

export interface ConfigImportXOptions extends OptionsFeatures, OptionsOverrides {
  /**
   * Use [eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript) if `typescript` is installed
   *
   * @default true
   */
  preferTypeScriptResolver?: boolean
}

export interface ConfigJavaScriptOptions extends OptionsOverrides {
  /**
   * Enable strict checking for JavaScript files
   *
   * @default false
   */
  strict?: boolean
}

export interface ConfigJsdocOptions extends OptionsFeatures, OptionsOverrides {}

export interface ConfigJsoncOptions extends OptionsOverrides {}

export interface ConfigMarkdownOptions extends OptionsExtensions, OptionsFiles, OptionsOverrides {}

export interface ConfigNodeOptions extends OptionsOverrides {}

export interface ConfigNtnyqOptions extends OptionsOverrides {}

export interface ConfigPerfectionistOptions extends OptionsOverrides {
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

  /**
   * Shared `partitionByComment` option
   *
   * @default ['@pg', '@perfectionist-group']
   */
  partitionByComment?: PerfectionistPartitionByComment

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
}

export interface ConfigPiniaOptions extends OptionsFiles, OptionsOverrides {}

export interface ConfigPrettierOptions extends OptionsOverrides {
  /**
   * Glob of built-in disabled files
   *
   * @default all svg, toml, svelte and astro files
   */
  disabledFiles?: string[]

  /**
   * rule severity
   *
   * @default `warn`
   */
  severity?: ESLintRuleSeverity

  /**
   * Glob of user custom disabled files
   *
   * @default []
   */
  userDisabledFiles?: string[]
}

export interface ConfigRegexpOptions extends OptionsOverrides {
  /**
   * rule severity
   *
   * @default 'error'
   */
  severity?: ESLintRuleSeverity
}

export interface ConfigSortOptions {
  /**
   * @default true
   */
  i18nLocale?: boolean

  /**
   * @default true
   */
  packageJson?: boolean

  /**
   * @default true
   */
  pnpmWorkspace?: boolean

  /**
   * @default true
   */
  tsconfig?: boolean
}

export interface ConfigSpecialsOptions {
  /**
   * Overrides cli rules
   */
  overridesCliRules?: TypedConfigItem['rules']

  /**
   * Overrides config files rules
   */
  overridesConfigFileRules?: TypedConfigItem['rules']

  /**
   * Overrides scripts rules
   */
  overridesScriptsRules?: TypedConfigItem['rules']

  /**
   * Overrides user scripts rules
   */
  overridesUserScriptsRules?: TypedConfigItem['rules']

  /**
   * More special case configs
   */
  specialCaseConfigs?: TypedConfigItem[]

  /**
   * ShadcnVue config
   */
  shadcnVue?:
    | boolean
    | {
        files?: TypedConfigItem['files']
        overridesRules?: TypedConfigItem['rules']
      }
}

export type ConfigSVGOOptions = ESLintConfig<SVGORuleOptions>

export interface ConfigTestOptions extends OptionsFiles, OptionsOverrides {
  /**
   * Overrides built-in vitest rules
   */
  overridesVitestRules?: TypedConfigItem['rules']

  /**
   * enable vitest plugin rules
   *
   * @default true if vitest in deps
   */
  vitest?: boolean
}

export interface ConfigTomlOptions extends OptionsOverrides {}

export interface ConfigTypeScriptOptions extends OptionsExtensions, OptionsFiles, OptionsOverrides {
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

  /**
   * Additional parser options
   */
  parserOptions?: TSESLintParserOptions

  /**
   * Enable type aware check for TypeScript files
   */
  tsconfigPath?: string
}

export interface ConfigUnicornOptions extends OptionsOverrides {}

export interface ConfigUnoCSSOptions extends OptionsOverrides {
  /**
   * Enable attributify sort order
   *
   * @default false
   */
  attributify?: boolean
}

export interface ConfigUnusedImportsOptions extends OptionsOverrides {}

export interface ConfigVueOptions extends OptionsFeatures, OptionsFiles, OptionsOverrides {
  /**
   * Create virtual files for Vue SFC blocks to enable linting.
   *
   * @see https://github.com/antfu/eslint-processor-vue-blocks
   *
   * @default true
   */
  sfcBlocks?: boolean | VueBlocksOptions
}

export interface ConfigYmlOptions extends OptionsOverrides {}

/**
 * Internal configs, not enabled
 */
interface ConfigOptionsInternal {
  format?: boolean | ConfigFormatOptions
  unusedImports?: boolean | ConfigUnusedImportsOptions
}

/**
 * Config factory options
 * @pg
 */
export interface ConfigOptions extends ConfigOptionsInternal, OptionsExtensions {
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
