import type { BuiltInParserName, RequiredOptions } from 'prettier'

/**
 * Prettier options
 */
export type PrettierOptions = Partial<
  Pick<
    RequiredOptions,
    | 'semi'
    | 'useTabs'
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
    | 'singleAttributePerLine'
    | 'experimentalTernaries'
    | 'vueIndentScriptAndStyle'
    | 'embeddedLanguageFormatting'
    | 'htmlWhitespaceSensitivity'
    | 'plugins'
  >
> & {
  parser?: BuiltInParserName
}
