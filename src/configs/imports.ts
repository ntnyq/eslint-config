import { pluginImport } from '../plugins'
import type { ConfigImportsOptions, TypedConfigItem } from '../types'

export const imports = (options: ConfigImportsOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/imports',
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
      'import/no-named-default': 'off',

      // disabled in favor or `perfectionist/sort-imports`
      'import/order': 'off',

      'import/first': 'error',
      'import/export': 'error',
      'import/no-self-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/newline-after-import': 'error',

      // Overrides rules
      ...options.overrides,
    },
  },
]
