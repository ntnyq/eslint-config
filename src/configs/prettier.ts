import prettierConfig from 'eslint-config-prettier'
import { pluginPrettier } from '../plugins'
import type { FlatESLintConfigItem } from 'eslint-define-config'

export const prettier: FlatESLintConfigItem[] = [
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...prettierConfig.rules,
      ...(pluginPrettier.configs!.recommended as FlatESLintConfigItem).rules,
      'prettier/prettier': 'warn',
    },
  },
]
