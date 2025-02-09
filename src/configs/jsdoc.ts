import { pluginJsdoc } from '../eslint'
import type { ConfigJsdocOptions, TypedConfigItem } from '../types'

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

export const configJsdoc = (
  options: ConfigJsdocOptions = {},
): TypedConfigItem[] => [
  {
    name: 'ntnyq/jsdoc',
    plugins: {
      jsdoc: pluginJsdoc,
    },
    rules: {
      // Disabled rules
      'jsdoc/tag-lines': 'off', // Use `jsdoc/sort-tags`
      'jsdoc/text-escaping': 'off', // No need

      // Fixable rules
      'jsdoc/empty-tags': 'error',
      'jsdoc/no-defaults': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/no-blank-blocks': 'error',
      'jsdoc/check-alignment': 'error',
      'jsdoc/multiline-blocks': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/no-multi-asterisks': 'error',
      'jsdoc/check-line-alignment': 'error',
      'jsdoc/check-property-names': 'error',
      'jsdoc/require-asterisk-prefix': 'error',
      'jsdoc/no-blank-block-descriptions': 'error',
      'jsdoc/require-hyphen-before-param-description': 'error',
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

      'jsdoc/check-access': 'warn',
      'jsdoc/implements-on-classes': 'warn',
      'jsdoc/require-param-name': 'warn',
      'jsdoc/require-property': 'warn',
      'jsdoc/require-property-name': 'warn',
      'jsdoc/require-property-description': 'warn',
      'jsdoc/require-returns-check': 'warn',
      'jsdoc/require-returns-description': 'warn',
      'jsdoc/require-yields-check': 'warn',

      // TypeScript rules overrides
      ...(options.typescript ? typescriptRules : javscriptRules),

      // Overrides rules
      ...options.overrides,
    },
  },
]
