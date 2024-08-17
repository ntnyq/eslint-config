import { pluginVitest } from '../plugins'
import { GLOB_TEST } from '../globs'
import type { ConfigVitestOptions, LinterConfig } from '../types'

export const vitest = (options: ConfigVitestOptions = {}): LinterConfig[] => [
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
