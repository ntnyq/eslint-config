import { pluginNtnyq } from '../plugins'
import type { ConfigNtnyqOptions, TypedConfigItem } from '../types'

// TODO: rename to `ntnyq`
export const createConfigNtnyq = (options: ConfigNtnyqOptions = {}): TypedConfigItem[] => [
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
