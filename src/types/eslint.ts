import type { Linter } from 'eslint'
import type { RuleOptions } from './typegen'

/**
 * Typed flat config item
 */
export type TypedConfigItem = Omit<Linter.Config<Linter.RulesRecord & RuleOptions>, 'plugins'> & {
  /**
   * Most plugin are not properly typed
   */
  plugins?: Record<string, any>
}

/**
 * ESLint parser
 */
export type ESLintParser = Linter.Parser

/**
 * ESLint processor
 */
export type ESLintProcessor = Linter.Processor

/**
 * Parser options
 */
export type ESLintParserOptions = Linter.ParserOptions
