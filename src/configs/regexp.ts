import { pluginRegexp } from '../plugins'
import type { ConfigRegexpOptions, LinterConfig } from '../types'

export const regexp = (options: ConfigRegexpOptions = {}): LinterConfig[] => [
  /**
   * https://github.com/ota-meshi/eslint-plugin-regexp/blob/master/lib/configs/rules/recommended.ts
   */
  {
    name: 'ntnyq/regexp',
    ...pluginRegexp.configs['flat/recommended'],

    // Overrides built-in rules
    ...options.overrides,
  },
]
