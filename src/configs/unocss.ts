import { pluginUnoCSS } from '../plugins'
import type { ConfigUnoCSSOptions, LinterConfig } from '../types'

export const unocss = (options: ConfigUnoCSSOptions = {}): LinterConfig[] => [
  {
    name: 'ntnyq/unocss',
    plugins: {
      unocss: pluginUnoCSS,
    },
    rules: {
      'unocss/order': 'error',
      // We don't use this
      'unocss/order-attributify': 'off',

      // Overrides built-in rules
      ...options.overrides,
    },
  },
]
