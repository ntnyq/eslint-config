import type { PrettierOptions } from './types'

/**
 * Options from `@ntnyq/prettier-config`
 *
 * @see {@link https://github.com/ntnyq/configs/blob/main/packages/prettier-config/index.js}
 */
export const DEFAULT_PRETTIER_OPTIONS: PrettierOptions = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  experimentalOperatorPosition: 'start',
  experimentalTernaries: false,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: true,
  objectWrap: 'preserve',
  printWidth: 80,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  rangeEnd: Number.POSITIVE_INFINITY,
  rangeStart: 0,
  requirePragma: false,
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  vueIndentScriptAndStyle: false,
}

/**
 * Shared perfectionist rule options
 */
export const COMMON_SHARED_PERFECTIONIST_RULE_OPTIONS = {
  fallbackSort: { order: 'asc', type: 'alphabetical' },
  ignoreCase: true,
  order: 'asc',
  type: 'alphabetical',
} as const
export const EXTRA_SHARED_PERFECTIONIST_RULE_OPTIONS = {
  newlinesBetween: 'ignore',
  partitionByComment: ['@pg', '@perfectionist-group'] as string[],
} as const

export const SHARED_SORT_OBJECTS_GROUPS = [
  'property',
  'multiline-property',
  'method',
  'multiline-method',
  'unknown',
]
