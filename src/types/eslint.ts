import type { RuleOptions } from './typegen'
import type { Linter } from 'eslint'

/**
 * Parser options
 */
export type ParserOptions = Linter.ParserOptions

/**
 * Rules
 */
export type Rules = RuleOptions

/**
 * Typed flat config item
 */
export type TypedConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
  /**
   * Most plugin are not properly typed
   */
  plugins?: Record<string, any>
}

/**
 * Refined `Linter.Config` type
 */
export type LinterConfig = TypedConfigItem

/**
 * ESLint rules
 */
export type RuleRecord = Linter.RulesRecord

/**
 * ESLint rules entry
 */
export type RuleRecordEntry = Record<string, RuleRecord>
