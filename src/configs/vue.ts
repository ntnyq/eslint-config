import { GLOB_VUE } from '../globs'
import { parserVue, pluginVue, tseslint } from '../plugins'
import { typescriptCore } from './typescript'
import type { ConfigVueOptions, TypedConfigItem } from '../types'

const vue2Rules: TypedConfigItem['rules'] = {
  ...pluginVue.configs.base.rules,
  ...pluginVue.configs.essential.rules,
  ...pluginVue.configs['strongly-recommended'].rules,
  ...pluginVue.configs.recommended.rules,
}

const vue3Rules: TypedConfigItem['rules'] = {
  ...pluginVue.configs.base.rules,
  ...pluginVue.configs['vue3-essential'].rules,
  ...pluginVue.configs['vue3-strongly-recommended'].rules,
  ...pluginVue.configs['vue3-recommended'].rules,
}

const disabledRules: TypedConfigItem['rules'] = {
  'vue/no-v-html': 'off',
  'vue/require-prop-types': 'off',
  'vue/require-default-prop': 'off',
  'vue/multi-word-component-names': 'off',
  'vue/no-v-text-v-html-on-component': 'off',
  'vue/no-setup-props-reactivity-loss': 'off',
}

const extensionRules: TypedConfigItem['rules'] = {
  'vue/prefer-template': 'error',
  'vue/no-sparse-arrays': 'error',
  'vue/no-empty-pattern': 'error',
  'vue/space-infix-ops': 'error',
  'vue/no-loss-of-precision': 'error',
  'vue/no-constant-condition': 'error',
  'vue/template-curly-spacing': 'error',
  'vue/eqeqeq': ['error', 'smart'],
  'vue/comma-style': ['error', 'last'],
  'vue/block-spacing': ['error', 'always'],
  'vue/dot-location': ['error', 'property'],
  'vue/space-in-parens': ['error', 'never'],
  'vue/operator-linebreak': ['error', 'before'],
  'vue/no-extra-parens': ['error', 'functions'],
  'vue/array-bracket-spacing': ['error', 'never'],
  'vue/object-curly-spacing': ['error', 'always'],
  'vue/comma-dangle': ['error', 'always-multiline'],
  'vue/quote-props': ['error', 'consistent-as-needed'],
  'vue/arrow-spacing': ['error', { before: true, after: true }],
  'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
  'vue/comma-spacing': ['error', { before: false, after: true }],
  'vue/dot-notation': ['error', { allowKeywords: true }],
  'vue/key-spacing': ['error', { beforeColon: false, afterColon: true }],
  'vue/keyword-spacing': ['error', { before: true, after: true }],
  'vue/no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
  'vue/space-unary-ops': [
    'error',
    {
      words: true,
      nonwords: false,
    },
  ],
  'vue/object-curly-newline': [
    'error',
    {
      multiline: true,
      consistent: true,
    },
  ],
  'vue/object-property-newline': [
    'error',
    {
      allowMultiplePropertiesPerLine: true,
    },
  ],
  'vue/object-shorthand': [
    'error',
    'always',
    {
      ignoreConstructors: false,
      avoidQuotes: true,
    },
  ],
}

const unCategorizedRules: TypedConfigItem['rules'] = {
  'vue/no-useless-v-bind': 'error',
  'vue/valid-define-options': 'error',
  'vue/prefer-define-options': 'error',
  'vue/no-irregular-whitespace': 'error',
  'vue/no-use-v-else-with-v-for': 'error',
  'vue/no-deprecated-delete-set': 'error',
  'vue/require-typed-object-prop': 'error',
  'vue/no-unused-emit-declarations': 'error',
  'vue/padding-line-between-blocks': 'error',
  'vue/no-ref-object-reactivity-loss': 'error',
  'vue/prefer-separate-static-class': 'error',
  'vue/next-tick-style': ['error', 'promise'],
  'vue/no-restricted-v-bind': ['error', '/^v-/'],
  'vue/custom-event-name-casing': ['error', 'camelCase'],
  'vue/define-emits-declaration': ['error', 'type-literal'],
  'vue/prefer-true-attribute-shorthand': ['error', 'always'],
  'vue/component-options-name-casing': ['error', 'PascalCase'],
  'vue/block-order': [
    'error',
    {
      order: ['script', 'template', 'style'],
    },
  ],
  'vue/no-static-inline-styles': [
    'error',
    {
      allowBinding: true,
    },
  ],
  'vue/no-deprecated-model-definition': [
    'error',
    {
      allowVue3Compat: true,
    },
  ],
  'vue/component-name-in-template-casing': [
    'error',
    'PascalCase',
    {
      // Force auto-import components to be PascalCase
      registeredComponentsOnly: false,
      ignores: ['slot', 'component'],
    },
  ],
  'vue/define-macros-order': [
    'error',
    {
      order: ['defineProps', 'defineEmits', 'defineOptions', 'defineSlots', 'defineModel'],
      defineExposeLast: true,
    },
  ],
  'vue/html-comment-content-spacing': [
    'error',
    'always',
    {
      exceptions: ['-'],
    },
  ],
}

export const vue = (options: ConfigVueOptions = {}): TypedConfigItem[] => {
  const isVue3 = options.vueVersion !== 2
  return [
    ...(tseslint.config({
      name: 'ntnyq/vue/ts',
      files: [GLOB_VUE],
      extends: typescriptCore(),
    }) as TypedConfigItem[]),

    {
      name: 'ntnyq/vue/core',
      files: [GLOB_VUE],
      plugins: {
        vue: pluginVue,
        '@typescript-eslint': tseslint.plugin,
      },
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          parser: '@typescript-eslint/parser',
          sourceType: 'module',
          extraFileExtensions: ['.vue'],
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      processor: pluginVue.processors['.vue'],
      rules: {
        ...(isVue3 ? vue3Rules : vue2Rules),

        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
              normal: 'always',
              component: 'always',
            },
            svg: 'always',
            math: 'always',
          },
        ],
        'vue/block-tag-newline': [
          'error',
          {
            singleline: 'always',
            multiline: 'always',
          },
        ],
        'vue/this-in-template': ['error', 'never'],
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/attributes-order': [
          'error',
          {
            order: [
              'EVENTS', // `@click="functionCall"`, `v-on="event"`
              'TWO_WAY_BINDING', // `v-model`
              'OTHER_DIRECTIVES', // `v-custom-directive`
              'LIST_RENDERING', // `v-for item in items`
              'CONDITIONALS', //  `v-if`, `v-show`, `v-cloak`
              'CONTENT', // `v-text`, `v-html`
              'SLOT', // `v-slot`, `slot`
              'UNIQUE', // `ref`, `key`
              'DEFINITION', // `is`, `v-is`
              'ATTR_DYNAMIC', // `v-bind:prop="foo"`, `:prop="foo"`
              // `OTHER_ATTR`, // `custom-prop="foo"`, `:prop="foo"`, `disabled`
              'RENDER_MODIFIERS', // `v-once`, `v-pre`
              'GLOBAL', // `id`
              'ATTR_STATIC', // `prop="foo", `static attributes
              'ATTR_SHORTHAND_BOOL', // `disabled`, prop shorthand
            ],
            alphabetical: false,
          },
        ],
        'vue/order-in-components': [
          'error',
          {
            order: [
              'el',
              'name',
              'key',
              'parent',
              'functional',
              ['provide', 'inject'],
              ['delimiters', 'comments'],
              ['components', 'directives', 'filters'],
              'extends',
              'mixins',
              'layout',
              'middleware',
              'validate',
              'scrollToTop',
              'transition',
              'loading',
              'inheritAttrs',
              'model',
              ['props', 'propsData'],
              'emits',
              'setup',
              'asyncData',
              'computed',
              'data',
              'fetch',
              'head',
              'methods',
              ['template', 'render'],
              'watch',
              'watchQuery',
              'LIFECYCLE_HOOKS',
              'renderError',
              'ROUTER_GUARDS',
            ],
          },
        ],
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: 1,
            multiline: 1,
          },
        ],

        ...disabledRules,

        ...extensionRules,

        ...unCategorizedRules,

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
