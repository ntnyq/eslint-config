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
 * Parser options
 */
export type ParserOptions = Linter.ParserOptions
