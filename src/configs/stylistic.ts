import { ensurePackages, interopDefault } from '../utils'
import type { ConfigStylisticOptions, TypedConfigItem } from '../types'

export const stylistic = async (
  options: ConfigStylisticOptions = {},
): Promise<TypedConfigItem[]> => {
  await ensurePackages(['@stylistic/eslint-plugin'])

  const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'))

  return [
    {
      name: 'ntnyq/stylistic',
      plugins: {
        '@stylistic': pluginStylistic,
      },
      rules: {
        // Only rules are not conflicted with Prettier
        // Use stylistic config to provide type support

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
