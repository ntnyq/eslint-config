/**
 * @file Merge prettier options
 */

import type { BuiltInParserName, RequiredOptions } from 'prettier'

type PrettierOptions = Partial<
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

export function mergePrettierOptions(
  options: PrettierOptions = {},
  overrides: PrettierOptions = {},
) {
  const result: PrettierOptions = {
    ...options,
    ...overrides,
    plugins: [
      // built-in plugins
      ...(options.plugins || []),

      // custom plugins
      ...(overrides.plugins || []),
    ],
  }
  return result
}
