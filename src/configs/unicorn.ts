import { pluginUnicorn } from '../eslint'
import type { ConfigUnicornOptions, TypedConfigItem } from '../types'

const disabledRules: TypedConfigItem['rules'] = {
  'unicorn/better-regex': 'off',
  'unicorn/explicit-length-check': 'off',
  'unicorn/prefer-top-level-await': 'off',
  'unicorn/no-array-callback-reference': 'off',
  /**
   * @see https://caniuse.com/?search=globalThis
   */
  'unicorn/prefer-global-this': 'off',
}

export const configUnicorn = (
  options: ConfigUnicornOptions = {},
): TypedConfigItem[] => [
  {
    name: 'ntnyq/unicorn',
    plugins: {
      unicorn: pluginUnicorn,
    },
    rules: {
      'unicorn/escape-case': 'error',
      'unicorn/no-for-loop': 'error',
      'unicorn/no-lonely-if': 'error',
      'unicorn/error-message': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/no-hex-escape': 'error',
      'unicorn/throw-new-error': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/new-for-builtins': 'error',
      'unicorn/prefer-type-error': 'error',
      'unicorn/prefer-math-trunc': 'error',
      'unicorn/no-console-spaces': 'error',
      'unicorn/no-zero-fractions': 'error',
      'unicorn/prefer-regexp-test': 'error',
      'unicorn/number-literal-case': 'error',
      'unicorn/no-typeof-undefined': 'error',
      'unicorn/prefer-math-min-max': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/no-static-only-class': 'error',
      'unicorn/prefer-reflect-apply': 'error',
      'unicorn/prefer-negative-index': 'error',
      'unicorn/prefer-structured-clone': 'error',
      'unicorn/custom-error-definition': 'error',
      'unicorn/prefer-modern-math-apis': 'error',
      'unicorn/prefer-number-properties': 'error',
      'unicorn/prefer-prototype-methods': 'error',
      'unicorn/prefer-keyboard-event-key': 'error',
      'unicorn/prefer-optional-catch-binding': 'error',
      'unicorn/consistent-existence-index-check': 'error',
      'unicorn/switch-case-braces': ['error', 'avoid'],
      'unicorn/catch-error-name': [
        'error',
        {
          name: 'err',
          ignore: ['^_.'],
        },
      ],

      'unicorn/prefer-date-now': 'error',

      // String
      'unicorn/prefer-code-point': 'error',
      'unicorn/prefer-string-slice': 'error',
      'unicorn/prefer-string-trim-start-end': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',

      // DOM
      'unicorn/prefer-query-selector': 'error',
      'unicorn/prefer-modern-dom-apis': 'error',
      'unicorn/prefer-dom-node-remove': 'error',
      'unicorn/prefer-dom-node-append': 'error',
      'unicorn/prefer-dom-node-dataset': 'error',
      'unicorn/prefer-add-event-listener': 'error',
      'unicorn/prefer-dom-node-text-content': 'error',
      'unicorn/no-invalid-remove-event-listener': 'error',

      // Array
      'unicorn/no-new-array': 'error',
      'unicorn/no-array-push-push': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/prefer-array-index-of': 'error',
      'unicorn/require-array-join-separator': 'error',
      'unicorn/no-array-method-this-argument': 'error',

      // Set
      'unicorn/prefer-set-has': 'error',
      'unicorn/prefer-set-size': 'error',

      ...disabledRules,

      // Overrides rules
      ...options.overrides,
    },
  },
]
