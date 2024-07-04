import { defineConfig } from '../types'
import { pluginUnoCSS } from '../plugins'

export const unocss = defineConfig([
  {
    name: 'ntnyq/unocss',
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
