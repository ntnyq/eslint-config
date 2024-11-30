import type { BuiltInParserName, RequiredOptions } from 'prettier'

/**
 * Prettier options
 */
export type PrettierOptions = Partial<
  Pick<
    RequiredOptions,
    | 'arrowParens'
    | 'bracketSameLine'
    | 'bracketSpacing'
    | 'embeddedLanguageFormatting'
    | 'endOfLine'
    | 'experimentalTernaries'
    | 'htmlWhitespaceSensitivity'
    | 'insertPragma'
    | 'jsxSingleQuote'
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
  >
> & {
  parser?: BuiltInParserName
}
