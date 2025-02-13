import { pluginDeMorgan } from '../eslint'
import type { ConfigDeMorganOptions, TypedConfigItem } from '../types'

export const configDeMorgan = (
  options: ConfigDeMorganOptions = {},
): TypedConfigItem[] => [
  {
    ...pluginDeMorgan.configs.recommended,
    name: 'ntnyq/de-morgan',
    rules: {
      ...pluginDeMorgan.configs.recommended.rules,

      // Overrides rules
      ...options.overrides,
    },
  },
]
