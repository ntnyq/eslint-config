/**
 * @file Config options
 */

import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { ESLintPluginCommandOptions } from 'eslint-plugin-command/types'
import type { CreateConfigOptions as GitHubActionOptions } from 'eslint-plugin-github-action'
import type { RuleOptions as SVGORuleOptions } from 'eslint-plugin-svgo/rule-options'
import type { Options as VueBlocksOptions } from 'eslint-processor-vue-blocks'
import type {
  ConfigIgnoresOptions,
  ConfigJsoncOptions,
  ConfigPerfectionistOptions,
  ConfigTomlOptions,
  ConfigUnicornOptions,
  ConfigYmlOptions,
} from '../configs'
import type { PrettierOptions } from '../types'
import type {
  ESLintConfig,
  ESLintRuleSeverity,
  TSESLintParserOptions,
  TypedConfigItem,
} from './eslint'
import type {
  OptionsExtensions,
  OptionsFeatures,
  OptionsFiles,
  OptionsOverrides,
} from './options'

export interface ConfigAntfuOptions extends OptionsOverrides {}

export type ConfigCommandOptions = ESLintPluginCommandOptions

export interface ConfigDeMorganOptions extends OptionsOverrides {}

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

export interface ConfigGitHubActionOptions
  extends GitHubActionOptions,
    OptionsOverrides {}

export type ConfigGitIgnoreOptions = Omit<FlatGitignoreOptions, 'strict'> & {
  /**
   * Throw an error if gitignore file not found.
   *
   * @default false
   */
  strict?: boolean
}

export interface ConfigImportXOptions
  extends OptionsFeatures,
    OptionsOverrides {
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

export interface ConfigMarkdownOptions
  extends OptionsExtensions,
    OptionsFiles,
    OptionsOverrides {}

export interface ConfigNodeOptions extends OptionsOverrides {}

export interface ConfigNtnyqOptions extends OptionsOverrides {}

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
   * JSON files to sort all properties alphabeta
   */
  additionalJsonFiles?: string[]

  /**
   * YAML files to sort all properties alphabeta
   */
  additionalYamlFiles?: string[]

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

export interface ConfigTypeScriptOptions
  extends OptionsExtensions,
    OptionsFiles,
    OptionsOverrides {
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

export interface ConfigUnoCSSOptions extends OptionsOverrides {
  /**
   * Enable attributify sort order
   *
   * @default false
   */
  attributify?: boolean
}

export interface ConfigUnusedImportsOptions extends OptionsOverrides {}

export interface ConfigVueOptions
  extends OptionsFeatures,
    OptionsFiles,
    OptionsOverrides {
  /**
   * Create virtual files for Vue SFC blocks to enable linting.
   *
   * @see https://github.com/antfu/eslint-processor-vue-blocks
   *
   * @default true
   */
  sfcBlocks?: boolean | VueBlocksOptions
}

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
export interface ConfigOptions
  extends ConfigOptionsInternal,
    OptionsExtensions {
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
