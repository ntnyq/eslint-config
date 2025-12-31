import { ensurePackages, interopDefault } from '../utils'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configESLintPlugin}
 */
export type ConfigESLintPluginOptions = OptionsOverrides

/**
 * Config for eslint plugin
 *
 * @see {@link https://github.com/eslint-community/eslint-plugin-eslint-plugin}
 *
 * @param options - {@link ConfigESLintPluginOptions}
 * @returns ESLint configs
 */
export const configESLintPlugin = async (
  options: ConfigESLintPluginOptions = {},
): Promise<TypedConfigItem[]> => {
  await ensurePackages(['eslint-plugin-eslint-plugin'])

  const pluginESLintPlugin = await interopDefault(
    import('eslint-plugin-eslint-plugin'),
  )

  return [
    {
      ...pluginESLintPlugin.configs.all,
      name: 'ntnyq/eslint-plugin',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      rules: {
        ...pluginESLintPlugin.configs.all.rules,

        // injected by `createRule`
        'eslint-plugin/require-meta-docs-url': 'off',

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
