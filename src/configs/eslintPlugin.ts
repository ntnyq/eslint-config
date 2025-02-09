import { ensurePackages, interopDefault } from '../utils'
import type { ConfigESLintPluginOptions, TypedConfigItem } from '../types'

export const configESLintPlugin = async (
  options: ConfigESLintPluginOptions = {},
): Promise<TypedConfigItem[]> => {
  await ensurePackages(['eslint-plugin-eslint-plugin'])

  const pluginESLintPlugin = await interopDefault(
    import('eslint-plugin-eslint-plugin'),
  )

  return [
    {
      ...pluginESLintPlugin.configs['flat/all'],
      name: 'ntnyq/eslint-plugin',
      rules: {
        ...pluginESLintPlugin.configs['flat/all'].rules,

        // injected by `createRule`
        'eslint-plugin/require-meta-docs-url': 'off',

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
