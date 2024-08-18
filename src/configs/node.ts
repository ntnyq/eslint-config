import { pluginNode } from '../plugins'
import type { ConfigNodeOptions, TypedConfigItem } from '../types'

export const node = (options: ConfigNodeOptions = {}): TypedConfigItem[] => [
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

      // Overrides built-in rules
      ...options.overrides,
    },
  },
]
