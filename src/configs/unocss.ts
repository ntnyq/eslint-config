import { defineFlatConfig } from 'eslint-define-config'
import { pluginUnoCSS } from '../plugins'

export const unocss = defineFlatConfig([
  {
    plugins: {
      unocss: pluginUnoCSS as any,
    },
    rules: {
      'unocss/order': 'error',
      // We don't use this
      'unocss/order-attributify': 'off',
    },
  },
])
