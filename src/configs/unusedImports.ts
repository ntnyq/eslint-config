import { pluginUnusedImports } from '../eslint'
import type { ConfigUnusedImportsOptions, TypedConfigItem } from '../types'

export const configUnusedImports = (
  options: ConfigUnusedImportsOptions = {},
): TypedConfigItem[] => [
  {
    name: 'ntnyq/unused-imports',
    plugins: {
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],

      // Overrides rules
      ...options.overrides,
    },
  },
]
