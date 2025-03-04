import {
  createNodeResolver,
  createTypeScriptImportResolver,
  pluginImportX,
} from '../eslint'
import type {
  OptionsOverrides,
  OptionsShareable,
  TypedConfigItem,
} from '../types'

/**
 * Options type of {@link configImportX}
 */
export type ConfigImportXOptions = Pick<OptionsShareable, 'typescript'>
  & OptionsOverrides & {
    /**
     * Use [eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript) if `typescript` is installed
     *
     * @default true
     */
    preferTypeScriptResolver?: boolean
  }

/**
 * Config for imports and exports
 *
 * @see {@link https://github.com/un-ts/eslint-plugin-import-x}
 *
 * @param options - {@link ConfigImportXOptions}
 * @returns ESLint configs
 */
export const configImportX = (
  options: ConfigImportXOptions = {},
): TypedConfigItem[] => {
  const {
    // use typescript resolve if possible
    preferTypeScriptResolver = true,
    typescript: enableTypeScript,
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
        'import-x/no-absolute-path': 'off',
        'import-x/no-named-as-default-member': 'off',
        'import-x/no-named-default': 'off',
        'import-x/no-unresolved': 'off',
        // disabled in favor or `perfectionist/sort-imports`
        'import-x/order': 'off',

        'import-x/consistent-type-specifier-style': [
          'error',
          'prefer-top-level',
        ],
        'import-x/export': 'error',
        'import-x/first': 'error',
        'import-x/newline-after-import': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/no-self-import': 'error',

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
