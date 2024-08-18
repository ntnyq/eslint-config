import { pluginVitest } from '../plugins'
import { GLOB_TEST } from '../globs'
import type { ConfigVitestOptions, TypedConfigItem } from '../types'

export const vitest = (options: ConfigVitestOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/test',
    plugins: {
      vitest: pluginVitest,
    },
    files: [GLOB_TEST],
    rules: {
      ...pluginVitest.configs.recommended.rules,

      // Overrides built-in rules
      ...options.overrides,
    },
  },
]
