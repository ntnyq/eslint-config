import globals from 'globals'
import jsConfig from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import unicornPlugin from 'eslint-plugin-unicorn'

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
    rules: {
      'no-console': 'off',
    },
  },

  {
    files: ['**/*.{test,spec}.js?(x)'],
    rules: {
      'no-unused-expressions': 'off',
      'max-lines-per-function': 'off',
    },
  },
]

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const jsx = [
  {
    files: ['**/*.jsx'],
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
        node: { extensions: ['.js', '.mjs', '.ts', '.mts', '.d.ts'] },
      },
    },
    rules: {
      'import/first': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
          pathGroupsExcludedImportTypes: ['type'],
        },
      ],
    },
  },
]

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const unicorn = [
  {
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/no-unsafe-regex': 'off',

      'unicorn/error-message': 'error',
      'unicorn/escape-case': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/number-literal-case': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-type-error': 'error',
      'unicorn/throw-new-error': 'error',
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/switch-case-braces': ['error', 'avoid'],
      'unicorn/no-typeof-undefined': 'error',
      'unicorn/prefer-set-size': 'error',
      'unicorn/better-regex': 'error',
      'unicorn/custom-error-definition': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-console-spaces': 'error',
      'unicorn/no-for-loop': 'error',
      'unicorn/no-hex-escape': 'error',
      'unicorn/no-lonely-if': 'error',
      'unicorn/prefer-keyboard-event-key': 'error',
      'unicorn/prefer-math-trunc': 'error',
      'unicorn/prefer-negative-index': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-number-properties': 'error',
      'unicorn/prefer-optional-catch-binding': 'error',
      'unicorn/prefer-prototype-methods': 'error',
      'unicorn/prefer-reflect-apply': 'error',

      'unicorn/prefer-date-now': 'error',

      // String
      'unicorn/prefer-string-slice': 'error',
      'unicorn/prefer-string-trim-start-end': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',

      // DOM
      'unicorn/prefer-add-event-listener': 'error',
      'unicorn/no-invalid-remove-event-listener': 'error',
      'unicorn/prefer-query-selector': 'error',
      'unicorn/prefer-modern-dom-apis': 'error',
      'unicorn/prefer-dom-node-append': 'error',
      'unicorn/prefer-dom-node-dataset': 'error',
      'unicorn/prefer-dom-node-remove': 'error',
      'unicorn/prefer-dom-node-text-content': 'error',

      // Array
      'unicorn/no-new-array': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/no-array-push-push': 'error',
      'unicorn/no-array-callback-reference': 'error',
      'unicorn/no-array-method-this-argument': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/prefer-array-index-of': 'error',
    },
  },
]
