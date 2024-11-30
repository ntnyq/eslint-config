import { pluginPerfectionist } from '../eslint'
import { GLOB_SRC, GLOB_SRC_EXT, GLOB_TYPES } from '../globs'
import type { ConfigPerfectionistOptions, TypedConfigItem } from '../types'

/**
 * Prefer `alphabetical` sort type
 */
export const perfectionist = (options: ConfigPerfectionistOptions = {}): TypedConfigItem[] => {
  const {
    sortEnums: enableSortEnums = true,
    sortTypes: enableSortTypes = true,
    sortConstants: enableSortConstants = true,
  } = options
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
            order: 'asc',
            type: 'natural',
            ignoreCase: true,
            internalPattern: ['^~/.+', '^@/.+', '^#.+'],
            newlinesBetween: 'ignore',
          },
        ],
        'perfectionist/sort-exports': [
          'error',
          {
            order: 'asc',
            type: 'line-length',
          },
        ],
        'perfectionist/sort-named-exports': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
            ignoreCase: true,
            groupKind: 'values-first',
          },
        ],
        'perfectionist/sort-named-imports': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
            ignoreCase: true,
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
            type: 'alphabetical',
            order: 'asc',
          },
        ],
        'perfectionist/sort-modules': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
            partitionByComment: true,
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
            type: 'alphabetical',
            order: 'asc',
          },
        ],
        // 'perfectionist/sort-interfaces': [
        //   'error',
        //   {
        //     type: 'alphabetical',
        //     order: 'asc',
        //   },
        // ],
        'perfectionist/sort-intersection-types': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
            groups: [
              'intersection',
              'named',
              'conditional',
              'function',
              'import',
              'keyword',
              'literal',
              'object',
              'operator',
              'tuple',
              'union',
              'nullish',
            ],
          },
        ],
        'perfectionist/sort-modules': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
            partitionByComment: true,
          },
        ],
        'perfectionist/sort-object-types': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
          },
        ],
        'perfectionist/sort-union-types': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
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
            type: 'alphabetical',
            order: 'asc',
          },
        ],
        'perfectionist/sort-objects': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
          },
        ],
        'perfectionist/sort-sets': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
          },
        ],
        'perfectionist/sort-modules': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
            partitionByComment: true,
          },
        ],

        // Overrides rules
        ...options.overridesConstantsRules,
      },
    })
  }

  return configs
}
