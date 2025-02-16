import { pluginComments } from '../eslint'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configESLintComments}
 */
export type ConfigESLintCommentsOptions = OptionsOverrides

/**
 * Config for eslint comments
 *
 * @see {@link https://github.com/eslint-community/eslint-plugin-eslint-comments}
 *
 * @param options - {@link ConfigESLintCommentsOptions}
 * @returns ESLint configs
 */
export const configESLintComments = (
  options: ConfigESLintCommentsOptions = {},
): TypedConfigItem[] => [
  {
    name: 'ntnyq/eslint-comments',
    plugins: {
      '@eslint-community/eslint-comments': pluginComments,
    },
    rules: {
      ...pluginComments.configs.recommended.rules,
      '@eslint-community/eslint-comments/disable-enable-pair': [
        'error',
        { allowWholeFile: true },
      ],

      // Overrides rules
      ...options.overrides,
    },
  },
]
