import { ensurePackages, interopDefault } from '../utils'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configUnusedImports}
 */
export type ConfigUnusedImportsOptions = OptionsOverrides

/**
 * Config for remove unused imports
 *
 * @see {@link https://github.com/sweepline/eslint-plugin-unused-imports}
 *
 * @param options - {@link ConfigUnusedImportsOptions}
 * @returns ESLint configs
 */
export const configUnusedImports = async (
  options: ConfigUnusedImportsOptions = {},
): Promise<TypedConfigItem[]> => {
  await ensurePackages(['eslint-plugin-unused-imports'])

  const pluginUnusedImports = await interopDefault(
    import('eslint-plugin-unused-imports'),
  )

  return [
    {
      name: 'ntnyq/unused-imports',
      plugins: {
        'unused-imports': pluginUnusedImports,
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
