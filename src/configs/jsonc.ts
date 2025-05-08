import { parserJsonc, pluginJsonc } from '../eslint'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configJsonc}
 */
export type ConfigJsoncOptions = OptionsOverrides
  & OptionsFiles & {
    /**
     * Whether disable prettier related rules
     */
    prettier?: boolean
  }

/**
 * @see {@link https://github.com/ota-meshi/eslint-plugin-jsonc/blob/master/lib/configs/base.ts}
 */
const disabledCoreRules: TypedConfigItem['rules'] = {
  'no-unused-expressions': 'off',
  'no-unused-vars': 'off',
  strict: 'off',
}

/**
 * Config for json, jsonc and json5 files
 *
 * @see {@link https://ota-meshi.github.io/eslint-plugin-jsonc}
 *
 * @param options - {@link ConfigJsoncOptions}
 * @returns ESLint configs
 */
export const configJsonc = (
  options: ConfigJsoncOptions = {},
): TypedConfigItem[] => {
  const { files = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC] } = options

  return [
    {
      name: 'ntnyq/jsonc',
      files,
      plugins: {
        jsonc: pluginJsonc,
      },
      languageOptions: {
        parser: parserJsonc,
      },
      rules: {
        'jsonc/array-bracket-spacing': ['error', 'never'],
        'jsonc/comma-dangle': ['error', 'never'],
        'jsonc/comma-style': ['error', 'last'],
        'jsonc/indent': ['error', 2],
        'jsonc/key-spacing': [
          'error',
          {
            afterColon: true,
            beforeColon: false,
          },
        ],
        'jsonc/no-bigint-literals': 'error',
        'jsonc/no-binary-expression': 'error',
        'jsonc/no-binary-numeric-literals': 'error',
        'jsonc/no-dupe-keys': 'error',
        'jsonc/no-escape-sequence-in-identifier': 'error',
        'jsonc/no-floating-decimal': 'error',
        'jsonc/no-hexadecimal-numeric-literals': 'error',
        'jsonc/no-infinity': 'error',
        'jsonc/no-multi-str': 'error',
        'jsonc/no-nan': 'error',
        'jsonc/no-number-props': 'error',
        'jsonc/no-numeric-separators': 'error',
        'jsonc/no-octal': 'error',
        'jsonc/no-octal-escape': 'error',
        'jsonc/no-octal-numeric-literals': 'error',
        'jsonc/no-parenthesized': 'error',
        'jsonc/no-plus-sign': 'error',
        'jsonc/no-regexp-literals': 'error',
        'jsonc/no-sparse-arrays': 'error',
        'jsonc/no-template-literals': 'error',
        'jsonc/no-undefined-value': 'error',
        'jsonc/no-unicode-codepoint-escapes': 'error',
        'jsonc/no-useless-escape': 'error',
        'jsonc/object-curly-newline': [
          'error',
          {
            consistent: true,
            multiline: true,
          },
        ],
        'jsonc/object-curly-spacing': ['error', 'always'],
        'jsonc/object-property-newline': [
          'error',
          {
            allowMultiplePropertiesPerLine: true,
          },
        ],
        'jsonc/quote-props': 'error',
        'jsonc/quotes': 'error',
        'jsonc/space-unary-ops': 'error',
        'jsonc/valid-json-number': 'error',
        'jsonc/vue-custom-block/no-parsing-error': 'error',

        ...disabledCoreRules,

        ...(options.prettier
          ? {
              'jsonc/array-bracket-newline': 'off',
              'jsonc/array-bracket-spacing': 'off',
              'jsonc/array-element-newline': 'off',
              'jsonc/comma-dangle': 'off',
              'jsonc/comma-style': 'off',
              'jsonc/indent': 'off',
              'jsonc/key-spacing': 'off',
              'jsonc/no-floating-decimal': 'off',
              'jsonc/object-curly-newline': 'off',
              'jsonc/object-curly-spacing': 'off',
              'jsonc/object-property-newline': 'off',
              'jsonc/quote-props': 'off',
              'jsonc/quotes': 'off',
              'jsonc/space-unary-ops': 'off',
            }
          : {}),

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
