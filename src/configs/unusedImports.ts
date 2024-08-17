import { pluginUnusedImports } from '../plugins'
import type { ConfigUnusedImportsOptions, LinterConfig } from '../types'

export const unusedImports = (options: ConfigUnusedImportsOptions = {}): LinterConfig[] => [
  {
    name: 'ntnyq/unused-imports',
    plugins: {
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Overrides built-in rules
      ...options.overrides,
    },
  },
]
