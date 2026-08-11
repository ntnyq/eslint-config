import { pluginNoOnlyTests, pluginVitest } from '../eslint'
import { GLOB_TEST } from '../globs'
import { hasVitest, resolveSubOptions } from '../utils'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options for a test config branch
 */
export type ConfigTestBranchOptions = OptionsFiles & OptionsOverrides

/**
 * Options type of {@link configTest}
 */
export interface ConfigTestOptions extends OptionsFiles {
  /**
   * Configure base test rules
   * @default true
   */
  base?: boolean | ConfigTestBranchOptions

  /**
   * Configure vitest plugin rules
   * @default true if vitest in deps
   */
  vitest?: boolean | ConfigTestBranchOptions
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

    base: enableBase = true,
    vitest: enableVitest = hasVitest(),
  } = options
  const baseOptions = resolveSubOptions(options, 'base')
  const vitestOptions = resolveSubOptions(options, 'vitest')

  const configs: TypedConfigItem[] = []

  if (enableBase) {
    configs.push(
      {
        name: 'ntnyq/test/setup',
        plugins: {
          'no-only-tests': pluginNoOnlyTests,
        },
      },
      {
        name: 'ntnyq/test/base',
        files: baseOptions.files ?? files,
        rules: {
          'max-lines-per-function': 'off',
          'no-unused-expressions': 'off',
          'no-only-tests/no-only-tests': 'error',

          // Overrides rules
          ...baseOptions.overrides,
        },
      },
    )
  }

  if (enableVitest) {
    configs.push({
      name: 'ntnyq/test/vitest',
      files: vitestOptions.files ?? files,
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
        ...vitestOptions.overrides,
      },
    })
  }

  return configs
}
