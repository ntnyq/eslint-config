import { defineConfig } from '../utils'
import { pluginComments } from '../plugins'

export const comments = defineConfig([
  {
    name: 'ntnyq/eslint-comments',
    plugins: {
      '@eslint-community/eslint-comments': pluginComments,
    },
    rules: {
      ...pluginComments.configs.recommended.rules,
      '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    },
  },
])
