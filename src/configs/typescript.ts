import { defineFlatConfig } from 'eslint-define-config'
import { GLOB_TS, GLOB_TSX } from '../shared'
import { parserTs, pluginTs } from '../plugins'

export const typescript = defineFlatConfig([
  {
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs as any,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
      ...pluginTs.configs.stylistic.rules,

      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow-as-parameter',
        },
      ],
      '@typescript-eslint/prefer-as-const': 'warn',

      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
    },
  },

  {
    files: ['**/*.d.ts'],
    rules: {
      'import/no-duplicates': 'off',
      'import/newline-after-import': 'off',
    },
  },

  {
    files: ['**/*.{spec,test}.ts?(x)'],
    rules: {
      'no-unused-expressions': 'off',
      'max-lines-per-function': 'off',
    },
  },

  {
    files: ['**/*.js', '**/*.cjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
])