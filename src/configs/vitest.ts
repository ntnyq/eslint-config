import { GLOB_TEST } from '../globs'
import { pluginVitest } from '../plugins'
import type { ConfigVitestOptions, TypedConfigItem } from '../types'

export const vitest = (options: ConfigVitestOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/vitest',
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
