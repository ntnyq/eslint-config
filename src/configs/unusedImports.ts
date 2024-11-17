import { pluginUnusedImports } from '../eslint'
import type { ConfigUnusedImportsOptions, TypedConfigItem } from '../types'

export const unusedImports = (options: ConfigUnusedImportsOptions = {}): TypedConfigItem[] => [
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
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          destructuredArrayIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Overrides rules
      ...options.overrides,
    },
  },
]
