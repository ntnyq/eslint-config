import unocssPlugin from '@unocss/eslint-plugin'
import type { FlatESLintConfig } from 'eslint-define-config'

export const unocss: FlatESLintConfig[] = [
  {
    plugins: {
      '@unocss': unocssPlugin,
    },
    rules: {
      ...unocssPlugin.configs.recommended.rules,
    },
  },
]
