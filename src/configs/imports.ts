import { defineFlatConfig } from 'eslint-define-config'
import { pluginImport } from '../plugins'

export const imports = defineFlatConfig([
  {
    plugins: {
      import: pluginImport,
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.mjs', '.ts', '.mts', '.d.ts'] },
      },
    },
    rules: {
      'import/no-unresolved': 'off',
      'import/no-absolute-path': 'off',
      'import/no-named-as-default-member': 'off',

      'import/first': 'error',
      'import/export': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/newline-after-import': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'never',
          pathGroups: [{ pattern: '{{@,~}/,#}**', group: 'internal' }],
          pathGroupsExcludedImportTypes: ['type'],
        },
      ],
    },
  },
])
