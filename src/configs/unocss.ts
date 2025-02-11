import { pluginUnoCSS } from '../eslint'
import type { ConfigUnoCSSOptions, TypedConfigItem } from '../types'

export const configUnoCSS = (
  options: ConfigUnoCSSOptions = {},
): TypedConfigItem[] => [
  {
    name: 'ntnyq/unocss',
    plugins: {
      unocss: pluginUnoCSS,
    },
    rules: {
      'unocss/order-attributify': options.attributify ? 'error' : 'off',

      'unocss/order': 'error',

      // Overrides rules
      ...options.overrides,
    },
  },
]
