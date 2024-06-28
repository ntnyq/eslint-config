/**
 * @file Types
 */

import type { ESLint, Linter } from 'eslint'

/**
 * ESLint config
 */
export type FlatConfig = Linter.FlatConfig

/**
 * ESLint Plugin
 */
export type ESLintPlugin = ESLint.Plugin

/**
 * ESLint rules
 */
export type RuleRecord = Linter.RulesRecord

/**
 * ESLint rules entry
 */
export type RuleRecordEntry = Record<string, RuleRecord>

/**
 * Define ESLint config
 */
export function defineConfig(configs: FlatConfig[] = []) {
  return configs
}
