import { config as createSVGOConfig } from 'eslint-plugin-svgo'
import type { ConfigSVGOOptions, TypedConfigItem } from '../types'

export const svgo = (options: ConfigSVGOOptions = {}): TypedConfigItem[] => [
  {
    ...createSVGOConfig(options),
    name: 'ntnyq/svgo',
  },
]
