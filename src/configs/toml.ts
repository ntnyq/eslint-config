import { parserToml, pluginToml } from '../eslint'
import { GLOB_TOML } from '../globs'
import type { ConfigTomlOptions, TypedConfigItem } from '../types'

export const toml = (options: ConfigTomlOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/toml',
    files: [GLOB_TOML],
    languageOptions: {
      parser: parserToml,
    },
    plugins: {
      toml: pluginToml,
    },
    rules: {
      'toml/comma-style': 'error',
      'toml/keys-order': 'error',
      'toml/no-space-dots': 'error',
      'toml/no-unreadable-number-separator': 'error',
      'toml/precision-of-fractional-seconds': 'error',
      'toml/precision-of-integer': 'error',
      'toml/tables-order': 'error',

      'toml/indent': ['error', 2],
      'toml/vue-custom-block/no-parsing-error': 'error',
      'toml/array-bracket-newline': 'error',
      'toml/array-bracket-spacing': ['error', 'never'],
      'toml/array-element-newline': ['error', 'never'],
      'toml/inline-table-curly-spacing': 'error',
      'toml/key-spacing': 'error',
      'toml/padding-line-between-pairs': 'error',
      'toml/padding-line-between-tables': 'error',
      'toml/quoted-keys': 'error',
      'toml/spaced-comment': 'error',
      'toml/table-bracket-spacing': 'error',

      // Overrides rules
      ...options.overrides,
    },
  },
]
