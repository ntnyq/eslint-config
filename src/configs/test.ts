import { pluginNoOnlyTests, pluginVitest } from '../eslint'
import { GLOB_TEST } from '../globs'
import { hasVitest } from '../utils'
import type { ConfigTestOptions, TypedConfigItem } from '../types'

export const configTest = (options: ConfigTestOptions = {}): TypedConfigItem[] => {
  const {
    // default test files
    files = [...GLOB_TEST],
    vitest: enableVitest = hasVitest(),
  } = options

  const configs: TypedConfigItem[] = [
    {
      name: 'ntnyq/test/setup',
      plugins: {
        'no-only-tests': pluginNoOnlyTests,
      },
    },
    {
      name: 'ntnyq/test/base',
      files,
      rules: {
        'no-unused-expressions': 'off',
        'max-lines-per-function': 'off',
        'no-only-tests/no-only-tests': 'error',

        // Overrides rules
        ...options.overrides,
      },
    },
  ]

  if (enableVitest) {
    configs.push({
      name: 'ntnyq/test/vitest',
      files,
      plugins: {
        vitest: pluginVitest,
      },
      rules: {
        ...pluginVitest.configs.recommended.rules,

        // Overrides rules
        ...options.overridesVitestRules,
      },
    })
  }

  return configs
}
