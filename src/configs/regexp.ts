/**
 * @file config for plugin regexp
 * @see {@link https://github.com/ota-meshi/eslint-plugin-regexp}
 */

import { pluginRegexp } from '../eslint'
import type { ConfigRegexpOptions, TypedConfigItem } from '../types'

export const regexp = (options: ConfigRegexpOptions = {}): TypedConfigItem[] => {
  const config = pluginRegexp.configs['flat/recommended'] as TypedConfigItem

  const rules = {
    ...config.rules,
  }

  if (options.level === 'warn') {
    for (const key in rules) {
      if (rules[key] === 'error') {
        rules[key] = 'warn'
      }
    }
  }

  return [
    {
      ...config,
      name: 'ntnyq/regexp',
      rules: {
        ...rules,

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
