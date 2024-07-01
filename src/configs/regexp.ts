import { pluginRegexp } from '../plugins'
import { defineConfig } from '../types'

export const regexp = defineConfig([
  /**
   * https://github.com/ota-meshi/eslint-plugin-regexp/blob/master/lib/configs/rules/recommended.ts
   */
  pluginRegexp.configs['flat/recommended'],
])
