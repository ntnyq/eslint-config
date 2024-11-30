import type { BuiltInParserName, RequiredOptions } from 'prettier'

/**
 * Prettier options
 */
export type PrettierOptions = Partial<
  Pick<
    RequiredOptions,
    | 'semi'
    | 'useTabs'
    | 'plugins'
    | 'tabWidth'
    | 'rangeEnd'
    | 'proseWrap'
    | 'endOfLine'
    | 'rangeStart'
    | 'quoteProps'
    | 'printWidth'
    | 'arrowParens'
    | 'singleQuote'
    | 'insertPragma'
    | 'trailingComma'
    | 'requirePragma'
    | 'bracketSpacing'
    | 'jsxSingleQuote'
    | 'bracketSameLine'
    | 'experimentalTernaries'
    | 'singleAttributePerLine'
    | 'vueIndentScriptAndStyle'
    | 'htmlWhitespaceSensitivity'
    | 'embeddedLanguageFormatting'
  >
> & {
  parser?: BuiltInParserName
}
