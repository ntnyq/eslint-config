import { parserJsonc, pluginJsonc } from '../eslint'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'
import type { ConfigJsoncOptions, TypedConfigItem } from '../types'

export const jsonc = (options: ConfigJsoncOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/jsonc',
    files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
    plugins: {
      jsonc: pluginJsonc,
    },
    languageOptions: {
      parser: parserJsonc,
    },
    rules: {
      ...(pluginJsonc.configs['recommended-with-jsonc'] as TypedConfigItem).rules,

      'jsonc/no-octal-escape': 'error',
      'jsonc/indent': ['error', 2],
      'jsonc/comma-style': ['error', 'last'],
      'jsonc/comma-dangle': ['error', 'never'],
      'jsonc/object-curly-spacing': ['error', 'always'],
      'jsonc/array-bracket-spacing': ['error', 'never'],
      'jsonc/key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true,
        },
      ],
      'jsonc/object-curly-newline': [
        'error',
        {
          multiline: true,
          consistent: true,
        },
      ],
      'jsonc/object-property-newline': [
        'error',
        {
          allowMultiplePropertiesPerLine: true,
        },
      ],

      // Overrides rules
      ...options.overrides,
    },
  },
]
