import {
  createNodeResolver,
  createTypeScriptImportResolver,
  pluginImportX,
} from '../eslint'
import type { ConfigImportXOptions, TypedConfigItem } from '../types'

export const configImportX = (
  options: ConfigImportXOptions = {},
): TypedConfigItem[] => {
  const {
    typescript: enableTypeScript,
    // use typescript resolve if possible
    preferTypeScriptResolver = true,
  } = options

  return [
    {
      name: 'ntnyq/import-x',
      plugins: {
        'import-x': pluginImportX,
      },
      settings: {
        'import-x/resolver-next': [
          enableTypeScript && preferTypeScriptResolver
            ? createTypeScriptImportResolver({
                extensions: [
                  '.ts',
                  '.tsx',
                  '.d.ts',
                  '.js',
                  '.jsx',
                  '.json',
                  '.node',
                ],
              })
            : createNodeResolver({
                extensions: ['.js', '.mjs', '.ts', '.mts', '.d.ts', '.json'],
              }),
        ],
      },
      rules: {
        'import-x/no-unresolved': 'off',
        'import-x/no-absolute-path': 'off',
        'import-x/no-named-as-default-member': 'off',
        'import-x/no-named-default': 'off',

        // disabled in favor or `perfectionist/sort-imports`
        'import-x/order': 'off',

        'import-x/first': 'error',
        'import-x/export': 'error',
        'import-x/no-self-import': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/newline-after-import': 'error',
        'import-x/consistent-type-specifier-style': [
          'error',
          'prefer-top-level',
        ],

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
