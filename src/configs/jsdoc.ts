import { pluginJsdoc } from '../eslint'
import type {
  OptionsOverrides,
  OptionsShareable,
  TypedConfigItem,
} from '../types'

/**
 * Options type of {@link configJsdoc}
 */
export type ConfigJsdocOptions = Pick<OptionsShareable, 'typescript'>
  & OptionsOverrides

/**
 * JavaScript specific rules
 */
const javscriptRules: TypedConfigItem['rules'] = {
  'jsdoc/no-types': 'off',
  'jsdoc/no-undefined-types': 'error',
  'jsdoc/require-param-type': 'error',
  'jsdoc/require-property-type': 'error',
  'jsdoc/require-returns-type': 'error',
}

/**
 * TypeScript specific rules
 */
const typescriptRules: TypedConfigItem['rules'] = {
  'jsdoc/no-undefined-types': 'off',
  'jsdoc/require-param-type': 'off',
  'jsdoc/require-property-type': 'off',
  'jsdoc/require-returns-type': 'off',
  'jsdoc/no-types': 'error',
}

/**
 * Config for jsdoc
 *
 * @see {@link https://github.com/gajus/eslint-plugin-jsdoc}
 *
 * @param options - {@link ConfigJsdocOptions}
 * @returns ESLint configs
 */
export const configJsdoc = (
  options: ConfigJsdocOptions = {},
): TypedConfigItem[] => [
  {
    name: 'ntnyq/jsdoc',
    plugins: {
      jsdoc: pluginJsdoc,
    },
    rules: {
      /**
       * @pg Disabled rules
       */
      'jsdoc/prefer-import-tag': 'off', // Not useful
      'jsdoc/require-tags': 'off', // Too strict
      'jsdoc/tag-lines': 'off', // Use `jsdoc/sort-tags`
      'jsdoc/text-escaping': 'off', // No need for this

      /**
       * @pg Warning only rules
       */
      'jsdoc/check-access': 'warn',
      'jsdoc/implements-on-classes': 'warn',
      'jsdoc/require-param-name': 'warn',
      'jsdoc/require-property': 'warn',
      'jsdoc/require-property-description': 'warn',
      'jsdoc/require-property-name': 'warn',
      'jsdoc/require-returns-check': 'warn',
      'jsdoc/require-returns-description': 'warn',
      'jsdoc/require-template-description': 'warn',
      'jsdoc/require-yields-check': 'warn',

      /**
       * @pg Maybe next release
       */
      'jsdoc/require-next-description': 'warn',
      'jsdoc/require-next-type': 'warn',
      'jsdoc/require-throws-description': 'warn',
      'jsdoc/require-throws-type': 'warn',
      'jsdoc/require-yields-description': 'warn',
      'jsdoc/require-yields-type': 'warn',

      /**
       * @pg Enabled rules
       */
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-line-alignment': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-property-names': 'error',
      'jsdoc/check-tag-names': [
        'error',
        {
          definedTags: [
            // magic-comments
            'vite-ignore',
            'unocss-include',

            // defined perfectionist group
            'pg',
            'perfectionist-group',

            // eslint-plugin-command (block comment only)
            'regex101',

            // non-standard, but common used
            'compatibility',
            'category',
            'experimental',
            'internal',
          ],
        },
      ],
      'jsdoc/check-types': 'error',
      /**
       * @pg Fixable rules
       */
      'jsdoc/empty-tags': 'error',
      'jsdoc/multiline-blocks': 'error',
      'jsdoc/no-bad-blocks': [
        'error',
        {
          ignore: [
            // built-in default
            'ts-check',
            'ts-expect-error',
            'ts-ignore',
            'ts-nocheck',

            // useful
            'vite-ignore',
          ],
        },
      ],
      'jsdoc/no-blank-block-descriptions': 'error',
      'jsdoc/no-blank-blocks': 'error',
      'jsdoc/no-defaults': 'error',
      'jsdoc/no-multi-asterisks': 'error',
      'jsdoc/reject-any-type': 'error',
      'jsdoc/reject-function-type': 'error',
      'jsdoc/require-asterisk-prefix': 'error',
      'jsdoc/require-hyphen-before-param-description': 'error',
      'jsdoc/type-formatting': [
        'error',
        {
          arrayBrackets: 'square',
          enableFixer: true,
          genericDot: false,
          objectFieldIndent: '',
          objectFieldQuote: null,
          objectFieldSeparator: 'comma',
          stringQuotes: 'single',
          typeBracketSpacing: '',
          unionSpacing: '',
        },
      ],

      // TypeScript rules overrides
      ...(options.typescript ? typescriptRules : javscriptRules),

      // Overrides rules
      ...options.overrides,
    },
  },
]
