import { pluginUnicorn } from '../eslint'
import type { ConfigUnicornOptions, TypedConfigItem } from '../types'

const disabledRules: TypedConfigItem['rules'] = {
  'unicorn/better-regex': 'off',
  'unicorn/explicit-length-check': 'off',
  'unicorn/no-array-callback-reference': 'off',
  /**
   * @see https://caniuse.com/?search=globalThis
   */
  'unicorn/prefer-global-this': 'off',
  'unicorn/prefer-top-level-await': 'off',
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
      'unicorn/catch-error-name': [
        'error',
        {
          name: 'err',

          ignore: ['^_.'],
        },
      ],
      'unicorn/consistent-existence-index-check': 'error',
      'unicorn/custom-error-definition': 'error',
      'unicorn/error-message': 'error',
      'unicorn/escape-case': 'error',
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-console-spaces': 'error',
      'unicorn/no-for-loop': 'error',
      'unicorn/no-hex-escape': 'error',
      'unicorn/no-lonely-if': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/no-static-only-class': 'error',
      'unicorn/no-typeof-undefined': 'error',
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/no-zero-fractions': 'error',
      'unicorn/number-literal-case': 'error',
      'unicorn/prefer-date-now': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-keyboard-event-key': 'error',
      'unicorn/prefer-math-min-max': 'error',
      'unicorn/prefer-math-trunc': 'error',
      'unicorn/prefer-modern-math-apis': 'error',
      'unicorn/prefer-negative-index': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-number-properties': 'error',
      'unicorn/prefer-optional-catch-binding': 'error',
      'unicorn/prefer-prototype-methods': 'error',
      'unicorn/prefer-reflect-apply': 'error',
      'unicorn/prefer-regexp-test': 'error',
      'unicorn/prefer-structured-clone': 'error',
      'unicorn/prefer-type-error': 'error',
      'unicorn/switch-case-braces': ['error', 'avoid'],

      'unicorn/throw-new-error': 'error',

      /**
       * @pg String
       */
      'unicorn/prefer-code-point': 'error',
      'unicorn/prefer-string-slice': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/prefer-string-trim-start-end': 'error',

      /**
       * @pg DOM
       */
      'unicorn/no-invalid-remove-event-listener': 'error',
      'unicorn/prefer-add-event-listener': 'error',
      'unicorn/prefer-dom-node-append': 'error',
      'unicorn/prefer-dom-node-dataset': 'error',
      'unicorn/prefer-dom-node-remove': 'error',
      'unicorn/prefer-dom-node-text-content': 'error',
      'unicorn/prefer-modern-dom-apis': 'error',
      'unicorn/prefer-query-selector': 'error',

      /**
       * @pg Array
       */
      'unicorn/no-array-method-this-argument': 'error',
      'unicorn/no-array-push-push': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/no-new-array': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/prefer-array-index-of': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/require-array-join-separator': 'error',

      /**
       * @pg Set
       */
      'unicorn/prefer-set-has': 'error',
      'unicorn/prefer-set-size': 'error',

      ...disabledRules,

      // Overrides rules
      ...options.overrides,
    },
  },
]
