import type { Linter } from 'eslint'
import type { ConfigWithExtends } from 'typescript-eslint'
import type { RuleOptions } from './typegen'
import type { Pretty } from './utils'

/**
 * ESLint config
 */
export type ESLintConfig<Rules extends ESLintRulesRecord = ESLintRulesRecord> =
  Linter.Config<Rules>

/**
 * ESLint parser
 */
export type ESLintParser = Linter.Parser

/**
 * ESLint parserOptions
 */
export type ESLintParserOptions = Linter.ParserOptions

/**
 * ESLint processor
 */
export type ESLintProcessor = Linter.Processor

/**
 * ESLint rule severity
 *
 * for config options use, don't need `off`
 */
export type ESLintRuleSeverity = 'error' | 'warn'

/**
 * ESLint rules
 */
export type ESLintRulesRecord = Linter.RulesRecord

/**
 * TypeScript ESLint parserOptions
 */
export type TSESLintParserOptions = Pretty<
  Required<Required<ConfigWithExtends>['languageOptions']>['parserOptions']
>

/**
 * Typed flat config item
 */
export type TypedConfigItem = Omit<
  Linter.Config<ESLintRulesRecord & RuleOptions>,
  'plugins'
> & {
  /**
   * Most plugin are not properly typed
   */
  plugins?: Record<string, any>
}
