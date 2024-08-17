import { pluginComments } from '../plugins'
import type { ConfigCommentsOptions, LinterConfig } from '../types'

export const comments = (options: ConfigCommentsOptions = {}): LinterConfig[] => [
  {
    name: 'ntnyq/eslint-comments',
    plugins: {
      '@eslint-community/eslint-comments': pluginComments,
    },
    rules: {
      ...pluginComments.configs.recommended.rules,
      '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],

      // Overrides built-in rules
      ...options.overrides,
    },
  },
]
