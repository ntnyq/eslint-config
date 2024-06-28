import { defineConfig } from '../types'
import { pluginComments } from '../plugins'

export const comments = defineConfig([
  {
    plugins: {
      'eslint-comments': pluginComments,
    },
    rules: {
      ...pluginComments.configs.recommended.rules,
      'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    },
  },
])
