import { config as createSVGOConfig } from 'eslint-plugin-svgo'
import type { ConfigSVGOOptions, TypedConfigItem } from '../types'

export const svgo = (options: ConfigSVGOOptions = {}): TypedConfigItem[] => [
  // TODO: remove after fix type
  // @ts-expect-error type
  {
    ...createSVGOConfig(options),
    name: 'ntnyq/svgo',
  },
]
