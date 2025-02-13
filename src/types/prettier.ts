import type { BuiltInParserName, Options } from 'prettier'

/**
 * Prettier options
 */
export type PrettierOptions = Pick<
  Options,
  | 'arrowParens'
  | 'bracketSameLine'
  | 'bracketSpacing'
  | 'embeddedLanguageFormatting'
  | 'endOfLine'
  | 'experimentalOperatorPosition'
  | 'experimentalTernaries'
  | 'htmlWhitespaceSensitivity'
  | 'insertPragma'
  | 'jsxSingleQuote'
  | 'objectWrap'
  | 'plugins'
  | 'printWidth'
  | 'proseWrap'
  | 'quoteProps'
  | 'rangeEnd'
  | 'rangeStart'
  | 'requirePragma'
  | 'semi'
  | 'singleAttributePerLine'
  | 'singleQuote'
  | 'tabWidth'
  | 'trailingComma'
  | 'useTabs'
  | 'vueIndentScriptAndStyle'
> & {
  parser?: BuiltInParserName
}
