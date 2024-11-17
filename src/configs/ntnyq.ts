import { pluginNtnyq } from '../eslint'
import type { ConfigNtnyqOptions, TypedConfigItem } from '../types'

export const ntnyq = (options: ConfigNtnyqOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/ntnyq',
    plugins: {
      ntnyq: pluginNtnyq,
    },
    rules: {
      'ntnyq/no-member-accessibility': 'error',

      // Overrides rules
      ...options.overrides,
    },
  },
]
