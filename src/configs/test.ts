import { pluginNoOnlyTests, pluginVitest } from '../eslint'
import { GLOB_TEST } from '../globs'
import { hasVitest } from '../utils'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configTest}
 */
export type ConfigTestOptions = OptionsFiles &
  OptionsOverrides & {
    /**
     * Overrides built-in vitest rules
     */
    overridesVitestRules?: TypedConfigItem['rules']

    /**
     * enable vitest plugin rules
     *
     * @default true if vitest in deps
     */
    vitest?: boolean
  }

/**
 * Config for test files
 *
 * @see {@link https://github.com/vitest-dev/eslint-plugin-vitest}
 *
 * @param options - {@link ConfigTestOptions}
 * @returns ESLint configs
 */
export const configTest = (
  options: ConfigTestOptions = {},
): TypedConfigItem[] => {
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
        'max-lines-per-function': 'off',
        'no-unused-expressions': 'off',
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
      settings: {
        /**
         * @see https://github.com/vitest-dev/eslint-plugin-vitest/tree/main?tab=readme-ov-file#enabling-with-type-testing
         */
        // https://github.com/vitest-dev/eslint-plugin-vitest/issues/664
        // vitest: {
        //   typecheck: true,
        // },
      },
      rules: {
        ...pluginVitest.configs.recommended.rules,

        'vitest/expect-expect': [
          'error',
          {
            assertFunctionNames: [
              'expect',
              'assert',
              /**
               * type test
               */
              'expectTypeOf',
              'assertType',
            ],
          },
        ],

        // Overrides rules
        ...options.overridesVitestRules,
      },
    })
  }

  return configs
}
