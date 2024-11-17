import { pluginUnoCSS } from '../eslint'
import type { ConfigUnoCSSOptions, TypedConfigItem } from '../types'

export const unocss = (options: ConfigUnoCSSOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/unocss',
    plugins: {
      unocss: pluginUnoCSS,
    },
    rules: {
      'unocss/order': 'error',
      // We don't use this
      'unocss/order-attributify': 'off',

      // Overrides rules
      ...options.overrides,
    },
  },
]
