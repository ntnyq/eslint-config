import { createConfig as createNtnyqConfig } from 'eslint-plugin-ntnyq'
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
    ...createNtnyqConfig({
      rules: {
        'ntnyq/prefer-newline-after-file-header': 'error',

        // Overrides rules
        ...options.overrides,
      },
    }),
    name: 'ntnyq/ntnyq',
  },
]
