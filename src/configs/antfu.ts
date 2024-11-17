import { pluginAntfu } from '../eslint'
import type { ConfigAntfuOptions, TypedConfigItem } from '../types'

export const antfu = (options: ConfigAntfuOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/antfu',
    plugins: {
      antfu: pluginAntfu,
    },
    rules: {
      // required `object-curly-newline` to be disabled
      // 'antfu/consistent-list-newline': 'error',

      'antfu/import-dedupe': 'error',
      'antfu/top-level-function': 'error',

      // Overrides rules
      ...options.overrides,
    },
  },
]
