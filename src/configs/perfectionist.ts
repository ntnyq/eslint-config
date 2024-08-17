import { pluginPerfectionist } from '../plugins'
import type { ConfigPerfectionistOptions, LinterConfig } from '../types'

export const perfectionist = (options: ConfigPerfectionistOptions = {}): LinterConfig[] => [
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
            'builtin',
            'external',
            'internal',
            'internal-type',
            'parent',
            'parent-type',
            'sibling',
            'sibling-type',
            'index',
            'index-type',
            'object',
            'type',
            'side-effect',
            'side-effect-style',
          ],
          internalPattern: ['~/**', '@/**', '#**'],
          newlinesBetween: 'ignore',
        },
      ],
      'perfectionist/sort-named-exports': ['warn', { groupKind: 'values-first' }],
      'perfectionist/sort-named-imports': ['warn', { groupKind: 'values-first' }],

      // Overrides built-in rules
      ...options.overrides,
    },
  },
]
