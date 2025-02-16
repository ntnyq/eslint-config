import type { PrettierOptions } from '../types'

/**
 * Options from `@ntnyq/prettier-config`
 *
 * @see {@link https://github.com/ntnyq/configs/blob/main/packages/prettier-config/index.js}
 */
export const PRETTIER_DEFAULT_OPTIONS: PrettierOptions = {
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
