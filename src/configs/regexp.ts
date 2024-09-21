import { pluginRegexp } from '../plugins'
import type { ConfigRegexpOptions, TypedConfigItem } from '../types'

export const regexp = (options: ConfigRegexpOptions = {}): TypedConfigItem[] => [
  /**
   * https://github.com/ota-meshi/eslint-plugin-regexp/blob/master/lib/configs/rules/recommended.ts
   */
  {
    name: 'ntnyq/regexp',
    ...pluginRegexp.configs['flat/recommended'],

    // Overrides rules
    ...options.overrides,
  },
]
