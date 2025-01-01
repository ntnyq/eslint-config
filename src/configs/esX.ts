import { ensurePackages, interopDefault } from '../utils'
import type { ConfigEsXOptions, TypedConfigItem } from '../types'

export const esX = async (options: ConfigEsXOptions = {}): Promise<TypedConfigItem[]> => {
  await ensurePackages(['eslint-plugin-es-x'])

  const pluginEsX = await interopDefault(import('eslint-plugin-es-x'))

  return [
    {
      name: 'ntnyq/es-x',
      plugins: {
        'es-x': pluginEsX,
      },
      rules: {
        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
