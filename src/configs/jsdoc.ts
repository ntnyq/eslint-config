import { pluginJsdoc } from '../eslint'
import type { ConfigJsdocOptions, TypedConfigItem } from '../types'

/**
 * Prefer typescript rules
 */
const typescriptRules: TypedConfigItem['rules'] = {
  'jsdoc/no-undefined-types': 'off',
  'jsdoc/require-param-type': 'off',
  'jsdoc/require-property-type': 'off',
  'jsdoc/require-returns-type': 'off',
  'jsdoc/no-types': 'error',
}

// const nextReleaseRules: TypedConfigItem['rules'] = {
//   'jsdoc/match-name': 'off',
//   'jsdoc/require-jsdoc': 'off',
//   'jsdoc/require-param': 'off',
//   'jsdoc/require-returns': 'off',
//   'jsdoc/require-description-complete-sentence': 'off',
// }

export const jsdoc = (options: ConfigJsdocOptions = {}): TypedConfigItem[] => [
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
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-line-alignment': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-property-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/empty-tags': 'error',
      'jsdoc/multiline-blocks': 'error',
      'jsdoc/no-bad-blocks': 'error',
      'jsdoc/no-blank-block-descriptions': 'error',
      'jsdoc/no-blank-blocks': 'error',
      'jsdoc/no-defaults': 'error',
      'jsdoc/no-multi-asterisks': 'error',
      'jsdoc/require-asterisk-prefix': 'error',
      'jsdoc/require-hyphen-before-param-description': 'error',
      'jsdoc/check-tag-names': [
        'error',
        {
          definedTags: [
            // magic-comments
            'vite-ignore',
            'unocss-include',
          ],
        },
      ],
      // TODO: this after investigate
      // 'jsdoc/sort-tags': [
      //   'error',
      //   {
      //     tagSequence: [
      //       {
      //         // Module/file-level
      //         tags: ['module', 'exports', 'file', 'fileoverview', 'overview', 'import'],
      //       },
      //       {
      //         // Identifying (name, type)
      //         tags: [
      //           'typedef',
      //           'interface',
      //           'record',
      //           'template',
      //           'name',
      //           'kind',
      //           'type',
      //           'alias',
      //           'external',
      //           'host',
      //           'callback',
      //           'func',
      //           'function',
      //           'method',
      //           'class',
      //           'constructor',
      //         ],
      //       },
      //       {
      //         // Relationships
      //         tags: [
      //           'modifies',
      //           'mixes',
      //           'mixin',
      //           'mixinClass',
      //           'mixinFunction',
      //           'namespace',
      //           'borrows',
      //           'constructs',
      //           'lends',
      //           'implements',
      //           'requires',
      //         ],
      //       },
      //       {
      //         // Long descriptions
      //         tags: ['desc', 'description', 'classdesc', 'tutorial', 'copyright', 'license'],
      //       },
      //       {
      //         // Simple annotations
      //         tags: [
      //           'const',
      //           'constant',
      //           'final',
      //           'global',
      //           'readonly',
      //           'abstract',
      //           'virtual',
      //           'var',
      //           'member',
      //           'memberof',
      //           'memberof!',
      //           'inner',
      //           'instance',
      //           'inheritdoc',
      //           'inheritDoc',
      //           'override',
      //           'hideconstructor',
      //         ],
      //       },
      //       {
      //         // Core function/object inf
      //         tags: ['param', 'arg', 'argument', 'prop', 'property', 'return', 'returns'],
      //       },
      //       {
      //         // Important behavior details
      //         tags: [
      //           'async',
      //           'generator',
      //           'default',
      //           'defaultvalue',
      //           'enum',
      //           'augments',
      //           'extends',
      //           'throws',
      //           'exception',
      //           'yield',
      //           'yields',
      //           'event',
      //           'fires',
      //           'emits',
      //           'listens',
      //           'this',
      //         ],
      //       },
      //       {
      //         // Access
      //         tags: ['static', 'private', 'protected', 'public', 'access', 'internal', 'package'],
      //       },
      //       {
      //         // Other/unknown
      //         tags: ['-other'],
      //       },
      //       {
      //         // Supplementary descriptions
      //         tags: ['see', 'example'],
      //       },
      //       {
      //         // Other Closure (undocumented) metadata
      //         tags: [
      //           'closurePrimitive',
      //           'customElement',
      //           'expose',
      //           'hidden',
      //           'idGenerator',
      //           'meaning',
      //           'ngInject',
      //           'owner',
      //           'wizaction',
      //         ],
      //       },
      //       {
      //         // Other Closure (documented) metadata
      //         tags: [
      //           'define',
      //           'dict',
      //           'export',
      //           'externs',
      //           'implicitCast',
      //           'noalias',
      //           'nocollapse',
      //           'nocompile',
      //           'noinline',
      //           'nosideeffects',
      //           'polymer',
      //           'polymerBehavior',
      //           'preserve',
      //           'struct',
      //           'suppress',
      //           'unrestricted',
      //         ],
      //       },
      //       {
      //         // Metadata
      //         tags: ['category'],
      //       },
      //       {
      //         // Non-Closure metadata
      //         tags: [
      //           'ignore',
      //           'author',
      //           'version',
      //           'variation',
      //           'since',
      //           'deprecated',
      //           'compatibility',
      //           'todo',
      //         ],
      //       },
      //     ],
      //     alphabetizeExtras: true,
      //     linesBetween: 1,
      //   },
      // ],

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
      ...(options.typescript ? typescriptRules : {}),

      // Overrides rules
      ...options.overrides,
    },
  },
]
