import { pluginStylistic } from '../eslint'
import type { ConfigStylisticOptions, TypedConfigItem } from '../types'

export const stylistic = (options: ConfigStylisticOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/stylistic',
    plugins: {
      '@stylistic': pluginStylistic,
    },
    rules: {
      // Only rules are not conflicted with Prettier
      // Use stylistic config to provide type support

      // Overrides rules
      ...options.overrides,
    },
  },
]
