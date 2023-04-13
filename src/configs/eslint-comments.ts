import commentsPlugin from 'eslint-plugin-eslint-comments'
import type { FlatESLintConfig } from 'eslint-define-config'

export const eslintComments: FlatESLintConfig[] = [
  {
    plugins: {
      'eslint-comments': commentsPlugin,
    },
    rules: {
      ...commentsPlugin.configs.recommended.rules,
      'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    },
  },
]
