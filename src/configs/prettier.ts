import prettierConfig from 'eslint-config-prettier'
import { defineConfig } from '../utils'
import { pluginPrettier } from '../plugins'
import type { RuleRecordEntry } from '../types'

export const prettier = defineConfig([
  {
    name: 'ntnyq/prettier',
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...prettierConfig.rules,
      ...(pluginPrettier.configs!.recommended as RuleRecordEntry).rules,
      'prettier/prettier': 'warn',
    },
  },
])
