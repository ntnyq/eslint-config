import { pluginUnoCSS } from '../plugins'
import type { FlatESLintConfigItem } from 'eslint-define-config'

export const unocss: FlatESLintConfigItem[] = [
  {
    plugins: {
      '@unocss': pluginUnoCSS,
    },
    rules: {
      ...pluginUnoCSS.configs.recommended.rules,
    },
  },
]
