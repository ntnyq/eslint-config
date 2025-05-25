import { mergeProcessors } from 'eslint-merge-processors'
import {
  parserTypeScript,
  parserVue,
  pluginTypeScript,
  pluginVue,
  processorVueBlocks,
} from '../eslint'
import { GLOB_VUE } from '../globs'
import type { Options as VueBlocksOptions } from 'eslint-processor-vue-blocks'
import type {
  ESLintProcessor,
  OptionsFiles,
  OptionsOverrides,
  OptionsShareable,
  TypedConfigItem,
} from '../types'

/**
 * Options type of {@link configVue}
 */
export type ConfigVueOptions = OptionsFiles
  & OptionsOverrides
  & OptionsShareable & {
    /**
     * Create virtual files for Vue SFC blocks to enable linting.
     *
     * @see https://github.com/antfu/eslint-processor-vue-blocks
     *
     * @default true
     */
    sfcBlocks?: boolean | VueBlocksOptions
  }

const sharedRules: TypedConfigItem['rules'] = {
  ...pluginVue.configs.base.rules,
  ...pluginVue.configs.essential.rules,
  ...pluginVue.configs['strongly-recommended'].rules,
  ...pluginVue.configs.recommended.rules,
}

const disabledRules: TypedConfigItem['rules'] = {
  'vue/multi-word-component-names': 'off',
  'vue/no-setup-props-reactivity-loss': 'off',
  'vue/no-v-html': 'off',
  'vue/no-v-text-v-html-on-component': 'off',
  'vue/require-default-prop': 'off',
  'vue/require-prop-types': 'off',
}

const extensionRules: TypedConfigItem['rules'] = {
  'vue/array-bracket-spacing': ['error', 'never'],
  'vue/arrow-spacing': ['error', { after: true, before: true }],
  'vue/block-spacing': ['error', 'always'],
  'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
  'vue/comma-dangle': ['error', 'always-multiline'],
  'vue/comma-spacing': ['error', { after: true, before: false }],
  'vue/comma-style': ['error', 'last'],
  'vue/dot-location': ['error', 'property'],
  'vue/dot-notation': ['error', { allowKeywords: true }],
  'vue/eqeqeq': ['error', 'smart'],
  'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }],
  'vue/keyword-spacing': ['error', { after: true, before: true }],
  'vue/no-constant-condition': 'error',
  'vue/no-empty-pattern': 'error',
  'vue/no-extra-parens': ['error', 'functions'],
  'vue/no-loss-of-precision': 'error',
  'vue/no-restricted-syntax': [
    'error',
    'DebuggerStatement',
    'LabeledStatement',
    'WithStatement',
  ],
  'vue/no-sparse-arrays': 'error',
  'vue/object-curly-newline': [
    'error',
    {
      consistent: true,
      multiline: true,
    },
  ],
  'vue/object-curly-spacing': ['error', 'always'],
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
      avoidQuotes: true,
      ignoreConstructors: false,
    },
  ],
  'vue/operator-linebreak': ['error', 'before'],
  'vue/prefer-template': 'error',
  'vue/quote-props': ['error', 'consistent-as-needed'],
  'vue/space-in-parens': ['error', 'never'],
  'vue/space-infix-ops': 'error',
  'vue/space-unary-ops': [
    'error',
    {
      nonwords: false,
      words: true,
    },
  ],
  'vue/template-curly-spacing': 'error',
}

const unCategorizedRules: TypedConfigItem['rules'] = {
  'vue/block-order': [
    'error',
    {
      order: ['script', 'template', 'style'],
    },
  ],
  'vue/block-tag-newline': [
    'error',
    {
      multiline: 'always',
      singleline: 'always',
    },
  ],
  'vue/component-api-style': ['error', ['script-setup', 'composition']],
  'vue/component-name-in-template-casing': [
    'error',
    'PascalCase',
    {
      ignores: ['slot', 'component'],

      // Force auto-import components to be PascalCase
      registeredComponentsOnly: false,
    },
  ],
  'vue/component-options-name-casing': ['error', 'PascalCase'],
  'vue/custom-event-name-casing': ['error', 'camelCase'],
  'vue/define-emits-declaration': ['error', 'type-literal'],
  'vue/define-macros-order': [
    'error',
    {
      defineExposeLast: true,
      order: [
        'defineProps',
        'defineEmits',
        'defineOptions',
        'defineSlots',
        'defineModel',
      ],
    },
  ],
  'vue/define-props-declaration': ['error', 'type-based'],
  'vue/enforce-style-attribute': [
    'error',
    {
      allow: ['scoped', 'plain'],
    },
  ],
  'vue/html-button-has-type': [
    'error',
    {
      button: true,
      reset: true,
      submit: true,
    },
  ],
  'vue/html-comment-content-newline': [
    'error',
    {
      multiline: 'always',
      singleline: 'ignore',
    },
    {
      exceptions: ['*'],
    },
  ],
  'vue/html-comment-content-spacing': [
    'error',
    'always',
    {
      exceptions: ['-'],
    },
  ],
  'vue/html-comment-indent': ['error', 2],
  'vue/next-tick-style': ['error', 'promise'],
  'vue/no-deprecated-delete-set': 'error',
  'vue/no-deprecated-model-definition': [
    'error',
    {
      allowVue3Compat: true,
    },
  ],
  'vue/no-duplicate-attr-inheritance': [
    'error',
    {
      checkMultiRootNodes: true,
    },
  ],
  'vue/no-empty-component-block': 'error',
  'vue/no-irregular-whitespace': 'error',
  'vue/no-multiple-objects-in-class': 'error',
  'vue/no-ref-object-reactivity-loss': 'error',
  'vue/no-required-prop-with-default': [
    'error',
    {
      autofix: true,
    },
  ],
  'vue/no-restricted-v-bind': ['error', '/^v-/'],
  'vue/no-static-inline-styles': [
    'error',
    {
      allowBinding: true,
    },
  ],
  'vue/no-unused-emit-declarations': 'error',
  'vue/no-use-v-else-with-v-for': 'error',
  'vue/no-useless-v-bind': 'error',
  'vue/no-v-text': 'error',
  'vue/padding-line-between-blocks': 'error',
  'vue/prefer-define-options': 'error',
  'vue/prefer-prop-type-boolean-first': 'error',
  'vue/prefer-separate-static-class': 'error',
  'vue/prefer-true-attribute-shorthand': ['error', 'always'],
  'vue/prefer-use-template-ref': 'error',
  'vue/require-macro-variable-name': [
    'error',
    {
      defineEmits: 'emits',
      defineProps: 'props',
      defineSlots: 'slots',
      useAttrs: 'attrs',
      useSlots: 'slots',
    },
  ],
  'vue/require-typed-object-prop': 'error',
  'vue/slot-name-casing': ['error', 'kebab-case'],
  'vue/v-for-delimiter-style': ['error', 'in'],
  'vue/valid-define-options': 'error',
}

/**
 * Config for vue files
 *
 * @see {@link https://github.com/vuejs/eslint-plugin-vue}
 *
 * @param options - {@link ConfigVueOptions}
 * @returns ESLint configs
 */
export const configVue = (
  options: ConfigVueOptions = {},
): TypedConfigItem[] => {
  const {
    files = [GLOB_VUE],

    extraFileExtensions = [],
  } = options
  const sfcBlocks: false | VueBlocksOptions =
    options.sfcBlocks === true ? {} : (options.sfcBlocks ?? {})

  function getVueProcessor(): ESLintProcessor {
    const processorVueSFC = pluginVue.processors['.vue'] as ESLintProcessor

    if (!sfcBlocks) {
      return processorVueSFC
    }

    return mergeProcessors([
      processorVueSFC,
      processorVueBlocks({
        ...sfcBlocks,
        blocks: {
          styles: true,
          ...sfcBlocks.blocks,
        },
      }),
    ])
  }

  return [
    {
      name: 'ntnyq/vue/setup',
      plugins: {
        '@typescript-eslint': pluginTypeScript,
        vue: pluginVue,
      },
    },

    {
      name: 'ntnyq/vue/rules',
      files,
      processor: getVueProcessor(),
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaVersion: 'latest',
          extraFileExtensions,
          parser: parserTypeScript,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        ...sharedRules,

        'vue/attributes-order': [
          'error',
          {
            alphabetical: false,
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
          },
        ],
        'vue/html-self-closing': [
          'error',
          {
            math: 'always',
            svg: 'always',
            html: {
              component: 'always',
              normal: 'always',
              void: 'always',
            },
          },
        ],
        'vue/max-attributes-per-line': [
          'error',
          {
            multiline: 1,
            singleline: 1,
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
              'slots',
              'expose',
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
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/this-in-template': ['error', 'never'],

        ...disabledRules,

        ...extensionRules,

        ...unCategorizedRules,

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
