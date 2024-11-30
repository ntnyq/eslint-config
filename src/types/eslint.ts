import type { Linter } from 'eslint'
import type { ConfigWithExtends } from 'typescript-eslint'
import type { RuleOptions } from './typegen'
import type { Pretty } from './utils'

/**
 * ESLint config
 */
export type ESLintConfig = Linter.Config

/**
 * ESLint parser
 */
export type ESLintParser = Linter.Parser

/**
 * ESLint processor
 */
export type ESLintProcessor = Linter.Processor

/**
 * ESLint parserOptions
 */
export type ESLintParserOptions = Linter.ParserOptions

/**
 * TypeScript ESLint parserOptions
 */
export type TSESLintParserOptions = Pretty<
  Required<Required<ConfigWithExtends>['languageOptions']>['parserOptions']
>

/**
 * Typed flat config item
 */
export type TypedConfigItem = Omit<Linter.Config<Linter.RulesRecord & RuleOptions>, 'plugins'> & {
  /**
   * Most plugin are not properly typed
   */
  plugins?: Record<string, any>
}
