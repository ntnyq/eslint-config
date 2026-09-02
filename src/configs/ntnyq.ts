import { pluginNtnyq } from '../eslint'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configNtnyq}
 */
export type ConfigNtnyqOptions = OptionsOverrides

/**
 * Config for common files
 *
 * @see {@link https://github.com/ntnyq/eslint-plugin-ntnyq}
 *
 * @param options - {@link ConfigNtnyqOptions}
 * @returns ESLint configs
 */
export const configNtnyq = (
  options: ConfigNtnyqOptions = {},
): TypedConfigItem[] => [
  {
    name: 'ntnyq/ntnyq',
    plugins: {
      ntnyq: pluginNtnyq,
    },
    rules: {
      'ntnyq/no-duplicate-exports': 'error',
      'ntnyq/no-explicit-void-return-type': 'error',
      'ntnyq/prefer-newline-after-file-header': 'error',
      'ntnyq/prefer-object-method-syntax': [
        'error',
        {
          allowArrowFunctions: 'singleLineOnly',
          fix: true,
        },
      ],

      // Overrides rules
      ...options.overrides,
    },
  },
]
