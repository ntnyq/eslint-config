import jsConfig from '@eslint/js'
import globals from 'globals'
import type { ConfigJavaScriptOptions, TypedConfigItem } from '../types'

export const javascript = (options: ConfigJavaScriptOptions = {}): TypedConfigItem[] => {
  const strictRules: TypedConfigItem['rules'] = {
    complexity: ['error', { max: 30 }],
    'max-params': ['error', { max: 5 }],
    'max-depth': ['error', { max: 5 }],
    'max-nested-callbacks': ['error', { max: 10 }],
    'max-lines': [
      'error',
      {
        max: 1000,
        skipComments: true,
        skipBlankLines: true,
      },
    ],
    'max-lines-per-function': [
      'error',
      {
        max: 200,
        skipComments: true,
        skipBlankLines: true,
      },
    ],
  }
  return [
    {
      ...jsConfig.configs.recommended,
      name: 'ntnyq/js/recommended',
    },
    {
      name: 'ntnyq/js/core',
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
        },
        sourceType: 'module',
      },

      rules: {
        'require-await': 'off',
        'no-return-assign': 'off',
        'no-useless-escape': 'off',
        'consistent-return': 'off',

        // disabled in favor of `perfectionist/sort-named-imports`
        'sort-imports': 'off',

        // standard v17.0.0
        'accessor-pairs': ['error', { setWithoutGet: true, enforceForClassMembers: true }],
        camelcase: [
          'error',
          {
            allow: ['^UNSAFE_'],
            properties: 'never',
            ignoreGlobals: true,
          },
        ],
        'constructor-super': 'error',
        curly: ['error', 'multi-line'],
        'default-case-last': 'error',
        'dot-notation': ['error', { allowKeywords: true }],
        'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
        'no-array-constructor': 'error',
        'no-async-promise-executor': 'error',
        'no-caller': 'error',
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
        'no-useless-backreference': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-empty-character-class': 'error',
        'no-empty-pattern': 'error',
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
        'no-prototype-builtins': 'error',
        'no-useless-catch': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-obj-calls': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-proto': 'error',
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
            allowTernary: true,
            allowTaggedTemplates: true,
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
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'symbol-description': 'error',
        'unicode-bom': ['error', 'never'],
        'use-isnan': [
          'error',
          {
            enforceForSwitchCase: true,
            enforceForIndexOf: true,
          },
        ],
        'valid-typeof': ['error', { requireStringLiterals: true }],
        yoda: ['error', 'never'],

        // es6+
        'no-var': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'no-empty-static-block': 'error',
        'no-new-native-nonconstructor': 'error',
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
          },
        ],
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true,
          },
        ],
        'object-shorthand': [
          'error',
          'always',
          {
            ignoreConstructors: false,
            avoidQuotes: true,
          },
        ],

        // best-practice
        eqeqeq: ['error', 'smart'],
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'no-alert': 'error',
        'no-case-declarations': 'error',
        'no-multi-str': 'error',
        'no-with': 'error',
        'no-void': 'error',
        'vars-on-top': 'error',
        'one-var': ['error', 'never'],
        'no-use-before-define': [
          'error',
          {
            functions: false,
            classes: false,
            variables: true,
          },
        ],

        // Strict rules
        ...(options.strict ? strictRules : {}),

        // Overrides built-in rules
        ...options.overrides,
      },
    },

    {
      name: 'ntnyq/js/scripts',
      files: ['**/scripts/*', '**/cli.*'],
      rules: {
        'no-console': 'off',
      },
    },

    {
      name: 'ntnyq/js/test',
      files: ['**/*.{test,spec}.js?(x)'],
      rules: {
        'no-unused-expressions': 'off',
        'max-lines-per-function': 'off',
      },
    },
  ]
}

export const jsx = (): TypedConfigItem[] => [
  {
    name: 'ntnyq/jsx',
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
