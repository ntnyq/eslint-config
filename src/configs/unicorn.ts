import { pluginUnicorn } from '../plugins'
import type { FlatESLintConfigItem } from 'eslint-define-config'

export const unicorn: FlatESLintConfigItem[] = [
  {
    plugins: {
      unicorn: pluginUnicorn,
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
      'unicorn/prefer-regexp-test': 'error',
      'unicorn/prefer-top-level-await': 'error',
      'unicorn/no-static-only-class': 'error',
      'unicorn/no-zero-fractions': 'error',
      'unicorn/custom-error-definition': 'error',
      'unicorn/prefer-modern-math-apis': 'error',
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
      'unicorn/catch-error-name': [
        'error',
        {
          name: 'err',
          ignore: ['^_.'],
        },
      ],

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
