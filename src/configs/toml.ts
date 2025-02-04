import { parserToml, pluginToml } from '../eslint'
import { GLOB_TOML } from '../globs'
import type { ConfigTomlOptions, TypedConfigItem } from '../types'

export const configToml = (options: ConfigTomlOptions = {}): TypedConfigItem[] => [
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
      'toml/keys-order': 'error',
      'toml/key-spacing': 'error',
      'toml/quoted-keys': 'error',
      'toml/comma-style': 'error',
      'toml/tables-order': 'error',
      'toml/no-space-dots': 'error',
      'toml/spaced-comment': 'error',
      'toml/precision-of-integer': 'error',
      'toml/table-bracket-spacing': 'error',
      'toml/array-bracket-newline': 'error',
      'toml/inline-table-curly-spacing': 'error',
      'toml/padding-line-between-pairs': 'error',
      'toml/padding-line-between-tables': 'error',
      'toml/no-unreadable-number-separator': 'error',
      'toml/precision-of-fractional-seconds': 'error',
      'toml/vue-custom-block/no-parsing-error': 'error',

      'toml/indent': ['error', 2],
      'toml/array-bracket-spacing': ['error', 'never'],
      'toml/array-element-newline': ['error', 'never'],

      // Overrides rules
      ...options.overrides,
    },
  },
]
