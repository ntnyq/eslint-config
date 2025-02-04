import { pluginVitest } from '../eslint'
import { GLOB_TEST } from '../globs'
import type { ConfigTestOptions, ESLintConfig, TypedConfigItem } from '../types'

export const configTest = (options: ConfigTestOptions = {}): TypedConfigItem[] => [
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

export const configVitest = (options: ConfigTestOptions = {}): TypedConfigItem[] => {
  if (!pluginVitest.configs?.recommended) return []

  const vitestConfigs = pluginVitest.configs as { recommended: ESLintConfig }

  return [
    {
      name: 'ntnyq/vitest',
      plugins: {
        vitest: pluginVitest,
      },
      files: [...GLOB_TEST],
      rules: {
        ...vitestConfigs.recommended.rules,

        // Overrides rules
        ...options.overridesVitestRules,
      },
    },
  ]
}
