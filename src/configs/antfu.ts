import { pluginAntfu } from '../eslint'
import type { ConfigAntfuOptions, TypedConfigItem } from '../types'

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
