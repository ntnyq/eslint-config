import { pluginNode } from '../eslint'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configNode}
 */
export type ConfigNodeOptions = OptionsOverrides

/**
 * Config for common files
 *
 * @see {@link https://github.com/eslint-community/eslint-plugin-n}
 *
 * @param options - {@link ConfigNodeOptions}
 * @returns ESLint configs
 */
export const configNode = (
  options: ConfigNodeOptions = {},
): TypedConfigItem[] => [
  {
    name: 'ntnyq/node',
    plugins: {
      node: pluginNode,
    },
    rules: {
      'node/handle-callback-err': ['error', '^(err|error)$'],
      'node/no-deprecated-api': 'error',
      'node/no-exports-assign': 'error',
      'node/no-new-require': 'error',
      'node/no-path-concat': 'error',
      'node/prefer-global/buffer': ['error', 'never'],
      'node/prefer-global/process': ['error', 'never'],
      'node/process-exit-as-throw': 'error',

      // Overrides rules
      ...options.overrides,
    },
  },
]
