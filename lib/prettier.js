import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

/** @type {import('eslint-define-config').FlatESLintConfigItem[]} */
export const prettier = [
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': 'warn',
    },
  },
]
