import { createConfig as createNtnyqConfig } from 'eslint-plugin-ntnyq'
import type { ConfigNtnyqOptions, TypedConfigItem } from '../types'

export const ntnyq = (options: ConfigNtnyqOptions = {}): TypedConfigItem[] => [
  {
    ...createNtnyqConfig({
      rules: {
        'ntnyq/prefer-newline-after-file-header': 'error',

        // Overrides rules
        ...options.overrides,
      },
    }),
    name: 'ntnyq/ntnyq',
  },
]
