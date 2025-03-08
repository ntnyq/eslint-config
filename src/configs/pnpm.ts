import { parserJsonc, pluginPnpm } from '../eslint'
import { GLOB_PACKAGE_JSON } from '../globs'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configPnpm}
 */
export type ConfigPnpmOptions = OptionsFiles & OptionsOverrides

/**
 * Config for optimize logic
 *
 * @see {@link https://github.com/azat-io/eslint-plugin-de-morgan}
 *
 * @param options - {@link ConfigPnpmOptions}
 * @returns ESLint configs
 */
export const configPnpm = (
  options: ConfigPnpmOptions = {},
): TypedConfigItem[] => {
  const { files = [GLOB_PACKAGE_JSON] } = options
  return [
    {
      name: 'ntnyq/pnpm',
      files,
      plugins: {
        pnpm: pluginPnpm,
      },
      languageOptions: {
        parser: parserJsonc,
      },
      rules: {
        'pnpm/enforce-catalog': [
          'error',
          {
            autofix: true,
          },
        ],
        'pnpm/prefer-workspace-settings': 'error',
        'pnpm/valid-catalog': 'error',
        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
