import { parserToml, pluginToml } from '../eslint'
import { GLOB_TOML } from '../globs'
import type { ConfigTomlOptions, TypedConfigItem } from '../types'

export const configToml = (
  options: ConfigTomlOptions = {},
): TypedConfigItem[] => [
  {
    name: 'ntnyq/toml',
    files: [GLOB_TOML],
    plugins: {
      toml: pluginToml,
    },
    languageOptions: {
      parser: parserToml,
    },
    rules: {
      'toml/array-bracket-newline': 'error',
      'toml/array-bracket-spacing': ['error', 'never'],
      'toml/array-element-newline': ['error', 'never'],
      'toml/comma-style': 'error',
      'toml/indent': ['error', 2],
      'toml/inline-table-curly-spacing': 'error',
      'toml/key-spacing': 'error',
      'toml/keys-order': 'error',
      'toml/no-space-dots': 'error',
      'toml/no-unreadable-number-separator': 'error',
      'toml/padding-line-between-pairs': 'error',
      'toml/padding-line-between-tables': 'error',
      'toml/precision-of-fractional-seconds': 'error',
      'toml/precision-of-integer': 'error',
      'toml/quoted-keys': 'error',
      'toml/spaced-comment': 'error',

      'toml/table-bracket-spacing': 'error',
      'toml/tables-order': 'error',
      'toml/vue-custom-block/no-parsing-error': 'error',

      // Overrides rules
      ...options.overrides,
    },
  },
]
