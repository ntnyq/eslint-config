import { pluginPerfectionist } from '../eslint'
import type { ConfigPerfectionistOptions, TypedConfigItem } from '../types'

export const perfectionist = (options: ConfigPerfectionistOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/perfectionist',
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
          order: options.imports?.order || 'asc',
          type: options.imports?.type || 'natural',
          ignoreCase: true,
          internalPattern: ['~/**', '@/**', '#**'],
          newlinesBetween: 'ignore',
        },
      ],
      'perfectionist/sort-exports': [
        'error',
        {
          order: options.exports?.order || 'asc',
          type: options.exports?.type || 'line-length',
        },
      ],
      'perfectionist/sort-named-exports': [
        'error',
        {
          type: options.namedExports?.type || 'alphabetical',
          order: options.namedExports?.order || 'asc',
          ignoreCase: true,
          groupKind: 'values-first',
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          type: options.namedImports?.type || 'alphabetical',
          order: options.namedImports?.order || 'asc',
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
