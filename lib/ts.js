import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import { GLOB_EXCLUDE, GLOB_TS, GLOB_TSX } from './shared.js'

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const ts = [
  {
    files: [GLOB_TS, GLOB_TSX],
    ignores: GLOB_EXCLUDE,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {},
  },

  {
    files: ['**/*.d.ts'],
    ignores: GLOB_EXCLUDE,
    rules: {
      'import/no-duplicates': 'off',
    },
  },

  {
    files: ['**/*.{spec,test}.ts?(x)'],
    rules: {
      'no-unused-expressions': 'off',
    },
  },
]
