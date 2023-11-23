import prettierConfig from 'eslint-config-prettier'
import { defineFlatConfig } from 'eslint-define-config'
import { pluginPrettier } from '../plugins'
import type { FlatESLintConfig } from 'eslint-define-config'

export const prettier = defineFlatConfig([
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...prettierConfig.rules,
      ...(pluginPrettier.configs!.recommended as FlatESLintConfig).rules,
      'prettier/prettier': 'warn',
    },
  },
])
