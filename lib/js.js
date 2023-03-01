import globals from 'globals'
import jsConfig from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import unicornPlugin from 'eslint-plugin-unicorn'
import { GLOB_EXCLUDE } from './shared.js'

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const js = [
  jsConfig.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      sourceType: 'module',
    },
    rules: {},
  },

  {
    files: ['**/scripts/*', '**/cli.*'],
    ignores: GLOB_EXCLUDE,
    rules: {
      'no-console': 'off',
    },
  },

  {
    files: ['**/*.{test,spec}.js?(x)'],
    rules: {
      'no-unused-expressions': 'off',
    },
  },
]

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const jsx = [
  {
    files: ['**/*.jsx'],
    ignores: GLOB_EXCLUDE,
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
]

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const imports = [
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.mjs', '.ts', '.d.ts'] },
      },
    },
    rules: {},
  },
]

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const unicorn = [
  {
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {},
  },
]
