import type { BuiltInParserName, RequiredOptions } from 'prettier'

/**
 * Prettier options
 */
export type PrettierOptions = Partial<
  Pick<
    RequiredOptions,
    | 'semi'
    | 'singleQuote'
    | 'trailingComma'
    | 'bracketSpacing'
    | 'bracketSameLine'
    | 'proseWrap'
    | 'arrowParens'
    | 'htmlWhitespaceSensitivity'
    | 'printWidth'
    | 'tabWidth'
    | 'useTabs'
    | 'endOfLine'
    | 'embeddedLanguageFormatting'
    | 'jsxSingleQuote'
    | 'singleAttributePerLine'
    | 'experimentalTernaries'
    | 'plugins'
  >
> & {
  parser?: BuiltInParserName
}
