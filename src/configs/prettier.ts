import prettierConfig from 'eslint-config-prettier'
import { defineConfig } from '../types'
import { pluginPrettier } from '../plugins'
import type { RuleRecordEntry } from '../types'

export const prettier = defineConfig([
  {
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
