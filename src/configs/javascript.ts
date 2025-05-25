import jsConfig from '@eslint/js'
import globals from 'globals'
import { GLOB_JSX_ONLY } from '../globs'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configJavaScript}
 */
export type ConfigJavaScriptOptions = OptionsOverrides & {
  /**
   * Enable strict checking for JavaScript files
   *
   * @default false
   */
  strict?: boolean
}

const strictRules: TypedConfigItem['rules'] = {
  complexity: ['error', { max: 30 }],
  'max-depth': ['error', { max: 5 }],
  'max-lines': [
    'error',
    {
      max: 1000,
      skipBlankLines: true,
      skipComments: true,
    },
  ],
  'max-lines-per-function': [
    'error',
    {
      max: 200,
      skipBlankLines: true,
      skipComments: true,
    },
  ],
  'max-nested-callbacks': ['error', { max: 10 }],
  'max-params': ['error', { max: 5 }],
}

/**
 * Config for JavaScript
 *
 * @see {@link https://github.com/eslint/eslint/tree/main/packages/js}
 *
 * @param options - {@link ConfigJavaScriptOptions}
 * @returns ESLint configs
 */
export const configJavaScript = (
  options: ConfigJavaScriptOptions = {},
): TypedConfigItem[] => [
  {
    ...jsConfig.configs.recommended,
    name: 'ntnyq/js/recommended',
  },
  {
    name: 'ntnyq/js/core',
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },

    rules: {
      'consistent-return': 'off',
      'no-return-assign': 'off',
      'no-useless-escape': 'off',
      'require-await': 'off',
      // disabled in favor of `perfectionist/sort-named-imports`
      'sort-imports': 'off',

      // standard v17.0.0
      'accessor-pairs': [
        'error',
        { enforceForClassMembers: true, setWithoutGet: true },
      ],
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      camelcase: [
        'error',
        {
          allow: ['^UNSAFE_'],
          ignoreGlobals: true,
          properties: 'never',
        },
      ],
      'constructor-super': 'error',
      curly: ['error', 'all'],
      'default-case-last': 'error',
      'dot-notation': ['error', { allowKeywords: true }],
      // best-practice
      eqeqeq: ['error', 'smart'],
      'new-cap': [
        'error',
        { capIsNew: false, newIsCap: true, properties: true },
      ],
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-async-promise-executor': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-const-assign': 'error',
      'no-constant-condition': ['error', { checkLoops: false }],
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-empty-character-class': 'error',
      'no-empty-pattern': 'error',
      'no-empty-static-block': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-implied-eval': 'error',
      'no-import-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-iterator': 'error',
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      'no-lone-blocks': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-multi-str': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-new-wrappers': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-proto': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': ['error', { builtinGlobals: false }],
      'no-regex-spaces': 'error',
      'no-self-assign': ['error', { props: true }],
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-this-before-super': 'error',
      'no-throw-literal': 'error',
      'no-undef': 'error',
      'no-undef-init': 'error',
      'no-unexpected-multiline': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-unreachable': 'error',
      'no-unreachable-loop': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        },
      ],
      'no-unused-vars': [
        'error',
        {
          args: 'none',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          vars: 'all',
        },
      ],
      'no-use-before-define': [
        'error',
        {
          allowNamedExports: false,
          classes: false,
          functions: false,
          variables: true,
        },
      ],
      'no-useless-backreference': 'error',
      'no-useless-call': 'error',
      'no-useless-catch': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      // es6+
      'no-var': 'error',
      'no-void': 'error',
      'no-with': 'error',
      'object-shorthand': [
        'error',
        'always',
        {
          avoidQuotes: true,
          ignoreConstructors: false,
        },
      ],
      'one-var': ['error', 'never'],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: true,
        },
      ],
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'symbol-description': 'error',
      'unicode-bom': ['error', 'never'],
      'use-isnan': [
        'error',
        {
          enforceForIndexOf: true,
          enforceForSwitchCase: true,
        },
      ],
      'valid-typeof': ['error', { requireStringLiterals: true }],
      'vars-on-top': 'error',
      yoda: ['error', 'never'],

      // Strict rules
      ...(options.strict ? strictRules : {}),

      // Overrides rules
      ...options.overrides,
    },
  },
]

export const configJSX = (): TypedConfigItem[] => [
  {
    name: 'ntnyq/jsx',
    files: [GLOB_JSX_ONLY],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
]
