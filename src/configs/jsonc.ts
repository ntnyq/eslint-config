import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'
import { parserJsonc, pluginJsonc } from '../plugins'
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
      ...(pluginJsonc.configs['recommended-with-jsonc'].rules as TypedConfigItem['rules']),
      'jsonc/array-bracket-spacing': ['error', 'never'],
      'jsonc/comma-dangle': ['error', 'never'],
      'jsonc/comma-style': ['error', 'last'],
      'jsonc/indent': ['error', 2],
      'jsonc/key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true,
        },
      ],
      'jsonc/no-octal-escape': 'error',
      'jsonc/object-curly-newline': [
        'error',
        {
          multiline: true,
          consistent: true,
        },
      ],
      'jsonc/object-curly-spacing': ['error', 'always'],
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
