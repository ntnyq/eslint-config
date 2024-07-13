import { pluginRegexp } from '../plugins'
import { defineConfig } from '../utils'

export const regexp = defineConfig([
  /**
   * https://github.com/ota-meshi/eslint-plugin-regexp/blob/master/lib/configs/rules/recommended.ts
   */
  {
    name: 'ntnyq/regexp',
    ...pluginRegexp.configs['flat/recommended'],
  },
])
