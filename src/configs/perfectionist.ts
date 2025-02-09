import { pluginPerfectionist } from '../eslint'
import { GLOB_SRC, GLOB_SRC_EXT, GLOB_TYPES } from '../globs'
import type { ConfigPerfectionistOptions, TypedConfigItem } from '../types'

interface CommonRuleOptions {
  disableNewlinesBetween?: boolean
  disablePartitionByComment?: boolean
}

const INTERFACE_OR_OBJECT_TYPES_GROUPS = [
  'required-property',
  'optional-property',
  'required-method',
  'optional-method',
  'required-multiline-property',
  'optional-multiline-property',
  'required-multiline-method',
  'optional-multiline-method',
  'unknown',
  'index-signature',
  'multiline-index-signature',
]

/**
 * Philosophy: keep simple thing first except null & undefined
 */
const INTERSECTION_OR_UNION_TYPES_GROUPS = [
  /**
   * eg. 'foobar', 24, false
   */
  'literal',

  /**
   * eg. number, string
   */
  'keyword',

  /**
   * eg. FooBar
   */
  'named',

  /**
   * eg. Foo & Bar
   */
  'intersection',

  /**
   * eg. Foobar extends string ? Foo : Bar
   */
  'conditional',

  /**
   * eg. (...args: any[]) => void
   */
  'function',

  /**
   * eg. import('eslint').Linter
   */
  'import',

  /**
   * eg. { foo: string; bar: number; }
   */
  'object',

  /**
   * eg. keyof T
   */
  'operator',

  /**
   * eg. [string, number]
   */
  'tuple',

  /**
   * eg. Foo | Bar
   */
  'union',

  /**
   * eg. null | undefined
   */
  'nullish',
]

export const configPerfectionist = (
  options: ConfigPerfectionistOptions = {},
): TypedConfigItem[] => {
  const {
    sortEnums: enableSortEnums = true,
    sortTypes: enableSortTypes = true,
    sortConstants: enableSortConstants = true,
    partitionByComment = ['@pg', '@perfectionist-group'],
  } = options

  /**
   * Prefer `alphabetical` sort type
   */
  function getCommonRuleOptions(options: CommonRuleOptions = {}) {
    const ruleOptions = {
      type: 'alphabetical',
      order: 'asc',
      ignoreCase: true,
      ...(options.disableNewlinesBetween
        ? {}
        : ({ newlinesBetween: 'ignore' } as const)),
      ...(options.disableNewlinesBetween
        ? {}
        : ({ partitionByComment } as const)),
    } as const

    return ruleOptions
  }

  const configs: TypedConfigItem[] = [
    {
      name: 'ntnyq/perfectionist/common',
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        'perfectionist/sort-imports': [
          'error',
          {
            ...getCommonRuleOptions(),
            groups: [
              // Side effect style imports (e.g. 'normalize.css')
              'side-effect-style',

              // Styles (e.g. *.{css,scss,less})
              'style',

              // Node.js built-in modules. (e.g. fs, path)
              'builtin',

              // External modules installed in the project (e.g. vue, lodash)
              'external',

              // Internal modules (e.g. @/utils, @/components)
              'internal',

              // Modules from parent directory (e.g. ../utils)
              'parent',

              // Modules from the same directory (e.g. ./utils)
              'sibling',

              // Main file from the current directory (e.g. ./index)
              'index',

              // TypeScript object-imports (e.g. import log = console.log)
              'object',

              // Side effect imports (e.g. import 'babel-polyfill')
              'side-effect',

              /**
               * Type import at the end
               */
              'builtin-type',
              'external-type',
              'internal-type',
              'parent-type',
              'sibling-type',
              'index-type',
              'type',

              /**
               * Imports that don’t fit into any other group
               */
              'unknown',
            ],
            internalPattern: ['^~/.+', '^@/.+', '^#.+'],
          },
        ],
        'perfectionist/sort-exports': [
          'error',
          {
            ...getCommonRuleOptions({
              disableNewlinesBetween: true,
            }),
            type: 'line-length',
            groupKind: 'values-first',
          },
        ],
        'perfectionist/sort-named-exports': [
          'error',
          {
            ...getCommonRuleOptions({
              disableNewlinesBetween: true,
            }),
            ignoreAlias: false,
            groupKind: 'values-first',
          },
        ],
        'perfectionist/sort-named-imports': [
          'error',
          {
            ...getCommonRuleOptions({
              disableNewlinesBetween: true,
            }),
            ignoreAlias: false,
            groupKind: 'values-first',
          },
        ],

        // Overrides rules
        ...options.overrides,
      },
    },
  ]

  if (enableSortEnums) {
    configs.push({
      name: 'ntnyq/perfectionist/enums',
      files: [`**/enums/${GLOB_SRC}`, `**/enums.${GLOB_SRC_EXT}`],
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        'perfectionist/sort-enums': [
          'error',
          {
            ...getCommonRuleOptions(),
          },
        ],
        'perfectionist/sort-modules': [
          'error',
          {
            ...getCommonRuleOptions(),
          },
        ],

        // Overrides rules
        ...options.overridesEnumsRules,
      },
    })
  }

  if (enableSortTypes) {
    configs.push({
      name: 'ntnyq/perfectionist/types',
      files: [...GLOB_TYPES],
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        'perfectionist/sort-heritage-clauses': [
          'error',
          {
            ...getCommonRuleOptions({
              disableNewlinesBetween: true,
              disablePartitionByComment: true,
            }),
          },
        ],
        'perfectionist/sort-interfaces': [
          'error',
          {
            ...getCommonRuleOptions(),
            groups: INTERFACE_OR_OBJECT_TYPES_GROUPS,
          },
        ],
        'perfectionist/sort-intersection-types': [
          'error',
          {
            ...getCommonRuleOptions(),
            groups: INTERSECTION_OR_UNION_TYPES_GROUPS,
          },
        ],
        'perfectionist/sort-modules': [
          'error',
          {
            ...getCommonRuleOptions(),
          },
        ],
        'perfectionist/sort-object-types': [
          'error',
          {
            ...getCommonRuleOptions(),
            groups: INTERFACE_OR_OBJECT_TYPES_GROUPS,
          },
        ],
        'perfectionist/sort-union-types': [
          'error',
          {
            ...getCommonRuleOptions(),
            groups: INTERSECTION_OR_UNION_TYPES_GROUPS,
          },
        ],

        // Overrides rules
        ...options.overridesTypesRules,
      },
    })
  }

  if (enableSortConstants) {
    configs.push({
      name: 'ntnyq/perfectionist/constants',
      files: [`**/constants/${GLOB_SRC}`, `**/constants.${GLOB_SRC_EXT}`],
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        'perfectionist/sort-maps': [
          'error',
          {
            ...getCommonRuleOptions(),
          },
        ],
        'perfectionist/sort-objects': [
          'error',
          {
            ...getCommonRuleOptions(),
            groups: [
              'property',
              'multiline-property',
              'method',
              'multiline-method',
              'unknown',
            ],
          },
        ],
        'perfectionist/sort-sets': [
          'error',
          {
            ...getCommonRuleOptions(),
          },
        ],
        'perfectionist/sort-modules': [
          'error',
          {
            ...getCommonRuleOptions(),
          },
        ],

        // Overrides rules
        ...options.overridesConstantsRules,
      },
    })
  }

  return configs
}
