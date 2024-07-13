import { defineConfig } from '../utils'
import { pluginUnoCSS } from '../plugins'

export const unocss = defineConfig([
  {
    name: 'ntnyq/unocss',
    plugins: {
      unocss: pluginUnoCSS,
    },
    rules: {
      'unocss/order': 'error',
      // We don't use this
      'unocss/order-attributify': 'off',
    },
  },
])
