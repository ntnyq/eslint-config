import { pluginEsX } from '../eslint'
import type { ConfigEsXOptions, TypedConfigItem } from '../types'

export const esX = (options: ConfigEsXOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/es-x',
    plugins: {
      'es-x': pluginEsX,
    },
    rules: {
      // Overrides rules
      ...options.overrides,
    },
  },
]
