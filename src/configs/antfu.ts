import { pluginAntfu } from '../eslint'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configAntfu}
 */
export type ConfigAntfuOptions = OptionsOverrides

/**
 * Config for common files
 *
 * @see {@link https://github.com/antfu/eslint-plugin-antfu}
 *
 * @param options - {@link ConfigAntfuOptions}
 * @returns ESLint configs
 */
export const configAntfu = (
  options: ConfigAntfuOptions = {},
): TypedConfigItem[] => [
  {
    name: 'ntnyq/antfu',
    plugins: {
      antfu: pluginAntfu,
    },
    rules: {
      // required `object-curly-newline` to be disabled
      // 'antfu/consistent-list-newline': 'error',

      'antfu/import-dedupe': 'error',
      'antfu/indent-unindent': 'error',
      'antfu/no-import-dist': 'error',
      'antfu/no-import-node-modules-by-path': 'error',

      // Overrides rules
      ...options.overrides,
    },
  },
]
