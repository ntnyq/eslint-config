import { pluginComments } from '../plugins'
import type { ConfigCommentsOptions, TypedConfigItem } from '../types'

export const comments = (options: ConfigCommentsOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/eslint-comments',
    plugins: {
      '@eslint-community/eslint-comments': pluginComments,
    },
    rules: {
      ...pluginComments.configs.recommended.rules,
      '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],

      // Overrides rules
      ...options.overrides,
    },
  },
]
