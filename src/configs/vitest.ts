import { defineConfig } from '../utils'
import { pluginVitest } from '../plugins'
import { GLOB_TEST } from '../globs'

export const vitest = defineConfig([
  {
    name: 'ntnyq/test',
    plugins: {
      vitest: pluginVitest,
    },
    files: [GLOB_TEST],
    rules: {
      ...pluginVitest.configs.recommended.rules,
    },
  },
])
