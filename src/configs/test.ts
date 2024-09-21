import { GLOB_TEST } from '../globs'
import { pluginVitest } from '../plugins'
import type { ConfigTestOptions, TypedConfigItem } from '../types'

export const test = (options: ConfigTestOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/test',
    files: [...GLOB_TEST],
    rules: {
      'no-unused-expressions': 'off',
      'max-lines-per-function': 'off',

      // Overrides rules
      ...options.overrides,
    },
  },
]

export const vitest = (options: ConfigTestOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/vitest',
    plugins: {
      vitest: pluginVitest,
    },
    files: [...GLOB_TEST],
    rules: {
      ...pluginVitest.configs.recommended.rules,

      // Overrides rules
      ...options.overridesVitestRules,
    },
  },
]
