import { parserToml, pluginToml } from '../eslint'
import { GLOB_TOML } from '../globs'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configToml}
 */
export type ConfigTomlOptions = OptionsOverrides & OptionsFiles

/**
 * Config for toml files
 *
 * @see {@link https://ota-meshi.github.io/eslint-plugin-toml}
 *
 * @param options - {@link ConfigTomlOptions}
 * @returns ESLint configs
 */
export const configToml = (
  options: ConfigTomlOptions = {},
): TypedConfigItem[] => {
  const { files = [GLOB_TOML] } = options

  return [
    {
      name: 'ntnyq/toml',
      files,
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
}
