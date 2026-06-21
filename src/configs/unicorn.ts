import { pluginUnicorn } from '../eslint'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Built-in presets of `eslint-plugin-unicorn`
 */
const PLUGIN_UNICORN_PRESET = ['all', 'recommended', 'unopinionated'] as const

/**
 * Type of built-in presets of `eslint-plugin-unicorn`
 */
type UnicornPreset = (typeof PLUGIN_UNICORN_PRESET)[number]

/**
 * Options type of {@link configUnicorn}
 */
export type ConfigUnicornOptions = OptionsOverrides & {
  /**
   * Use a built-in preset
   */
  preset?: UnicornPreset
}

/**
 * Config for powerful rules
 *
 * @see {@link https://github.com/sindresorhus/eslint-plugin-unicorn}
 *
 * @param options - {@link ConfigUnicornOptions}
 * @returns ESLint configs
 */
export const configUnicorn = (
  options: ConfigUnicornOptions = {},
): TypedConfigItem[] => {
  if (options.preset && PLUGIN_UNICORN_PRESET.includes(options.preset)) {
    return [
      {
        name: `ntnyq/unicorn/${options.preset}`,
        plugins: {
          unicorn: pluginUnicorn,
        },
        rules: {
          ...pluginUnicorn.configs[options.preset].rules,

          // Overrides rules
          ...options.overrides,
        },
      },
    ]
  }
  return [
    {
      name: 'ntnyq/unicorn',
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        'unicorn/explicit-length-check': 'off',
        /**
         * @see https://caniuse.com/?search=globalThis
         */
        'unicorn/prefer-global-this': 'off',
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/consistent-assert': 'error',
        'unicorn/consistent-conditional-object-spread': ['error', 'ternary'],
        'unicorn/consistent-existence-index-check': 'error',
        'unicorn/consistent-json-file-read': 'error',
        'unicorn/error-message': 'error',
        'unicorn/escape-case': 'error',
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-accessor-recursion': 'error',
        'unicorn/no-blob-to-file': 'error',
        'unicorn/no-canvas-to-image': 'error',
        'unicorn/no-console-spaces': 'error',
        'unicorn/no-constant-zero-expression': 'error',
        'unicorn/no-double-comparison': 'error',
        'unicorn/no-for-loop': 'error',
        'unicorn/no-hex-escape': 'error',
        'unicorn/no-immediate-mutation': 'error',
        'unicorn/no-instanceof-builtins': 'error',
        'unicorn/no-invalid-file-input-accept': 'error',
        'unicorn/no-late-current-target-access': 'error',
        'unicorn/no-lonely-if': 'error',
        'unicorn/no-new-buffer': 'error',
        'unicorn/no-static-only-class': 'error',
        'unicorn/no-this-outside-of-class': 'error',
        'unicorn/no-typeof-undefined': 'error',
        'unicorn/no-unnecessary-await': 'error',
        'unicorn/no-unnecessary-boolean-comparison': 'error',
        'unicorn/no-unnecessary-global-this': 'error',
        'unicorn/no-unnecessary-nested-ternary': 'error',
        'unicorn/no-unsafe-property-key': 'error',
        'unicorn/no-useless-boolean-cast': 'error',
        'unicorn/no-useless-coercion': 'error',
        'unicorn/no-useless-collection-argument': 'error',
        'unicorn/no-useless-continue': 'error',
        'unicorn/no-useless-else': 'error',
        'unicorn/no-useless-iterator-to-array': 'error',
        'unicorn/prefer-class-fields': 'error',
        'unicorn/prefer-import-meta-properties': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-keyboard-event-key': 'error',
        'unicorn/prefer-math-min-max': 'error',
        'unicorn/prefer-math-trunc': 'error',
        'unicorn/prefer-modern-math-apis': 'error',
        'unicorn/prefer-negative-index': 'error',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-optional-catch-binding': 'error',
        'unicorn/prefer-prototype-methods': 'error',
        'unicorn/prefer-reflect-apply': 'error',
        'unicorn/prefer-response-static-json': 'error',
        'unicorn/prefer-single-array-predicate': 'error',
        'unicorn/prefer-single-object-destructuring': 'error',
        'unicorn/prefer-structured-clone': 'error',
        'unicorn/switch-case-braces': ['error', 'avoid'],
        'unicorn/switch-case-break-position': 'error',
        /**
         * @pg Error
         */
        'unicorn/catch-error-name': [
          'error',
          {
            name: 'error',
            ignore: ['^_.'],
          },
        ],
        'unicorn/custom-error-definition': 'error',
        'unicorn/no-useless-error-capture-stack-trace': 'error',
        'unicorn/prefer-type-error': 'error',
        'unicorn/throw-new-error': 'error',
        /**
         * @pg Number
         */
        'unicorn/no-zero-fractions': 'error',
        'unicorn/number-literal-case': [
          'error',
          {
            // compatibility with prettier
            hexadecimalValue: 'lowercase',
          },
        ],
        'unicorn/prefer-math-abs': 'error',
        'unicorn/prefer-number-coercion': 'error',
        'unicorn/prefer-number-properties': 'error',
        /**
         * @pg BigInt
         */
        'unicorn/prefer-bigint-literals': 'error',
        /**
         * @pg RegExp
         */
        'unicorn/prefer-regexp-test': 'error',
        /**
         * @pg Date
         */
        'unicorn/consistent-date-clone': 'error',
        'unicorn/prefer-date-now': 'error',
        /**
         * @pg String
         */
        'unicorn/consistent-template-literal-escape': 'error',
        'unicorn/no-unsafe-string-replacement': 'error',
        'unicorn/prefer-code-point': 'error',
        'unicorn/prefer-string-pad-start-end': 'error',
        'unicorn/prefer-string-repeat': 'error',
        'unicorn/prefer-string-slice': 'error',
        'unicorn/prefer-string-starts-ends-with': 'error',
        'unicorn/prefer-string-trim-start-end': 'error',
        /**
         * @pg DOM
         */
        'unicorn/better-dom-traversing': 'error',
        'unicorn/dom-node-dataset': 'error',
        'unicorn/no-incorrect-query-selector': 'error',
        'unicorn/no-invalid-remove-event-listener': 'error',
        'unicorn/prefer-add-event-listener': 'error',
        'unicorn/prefer-classlist-toggle': 'error',
        'unicorn/prefer-dom-node-append': 'error',
        'unicorn/prefer-dom-node-remove': 'error',
        'unicorn/prefer-dom-node-text-content': 'error',
        'unicorn/prefer-modern-dom-apis': 'error',
        'unicorn/prefer-query-selector': 'error',
        /**
         * @pg Array
         */
        'unicorn/no-array-callback-reference': 'off',
        /**
         * TODO: chrome 110, baseline 2023 required
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed#browser_compatibility
         */
        'unicorn/no-array-reverse': 'off',
        'unicorn/no-array-sort': 'off',
        'unicorn/no-array-fill-with-reference-type': 'error',
        'unicorn/no-array-from-fill': 'error',
        'unicorn/no-array-method-this-argument': 'error',
        'unicorn/no-confusing-array-splice': 'error',
        'unicorn/no-confusing-array-with': 'error',
        'unicorn/no-duplicate-loops': 'error',
        'unicorn/no-new-array': 'error',
        'unicorn/no-unnecessary-array-flat-depth': 'error',
        'unicorn/no-unnecessary-array-splice-count': 'error',
        'unicorn/no-unnecessary-slice-end': 'error',
        'unicorn/no-unused-array-method-return': 'error',
        'unicorn/prefer-array-find': 'error',
        'unicorn/prefer-array-flat-map': 'error',
        'unicorn/prefer-array-index-of': 'error',
        'unicorn/prefer-array-some': 'error',
        'unicorn/prefer-includes-over-repeated-comparisons': 'error',
        'unicorn/prefer-single-call': 'error',
        'unicorn/require-array-join-separator': 'error',
        /**
         * @pg Set
         */
        'unicorn/no-duplicate-set-values': 'error',
        'unicorn/prefer-set-has': 'error',
        'unicorn/prefer-set-size': 'error',
        /**
         * @pg Map
         */
        'unicorn/prefer-has-check': 'error',
        'unicorn/prefer-object-from-entries': 'error',
        /**
         * @pg Class
         */
        'unicorn/no-useless-override': 'error',
        /**
         * @pg Module
         */
        'unicorn/no-exports-in-scripts': 'error',
        'unicorn/require-module-attributes': 'error',
        'unicorn/require-module-specifiers': 'error',

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
