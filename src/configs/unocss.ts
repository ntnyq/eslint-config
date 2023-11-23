import { defineFlatConfig } from 'eslint-define-config'
import { pluginUnoCSS } from '../plugins'

export const unocss = defineFlatConfig([
  {
    plugins: {
      '@unocss': pluginUnoCSS,
    },
    rules: {
      ...pluginUnoCSS.configs.recommended.rules,
    },
  },
])
