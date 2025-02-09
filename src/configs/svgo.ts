import { createConfig as createSVGOConfig } from 'eslint-plugin-svgo'
import { GLOB_SVG } from '../globs'
import type { ConfigSVGOOptions, TypedConfigItem } from '../types'

export const configSVGO = (
  options: ConfigSVGOOptions = {},
): TypedConfigItem[] => {
  const { files = [GLOB_SVG], rules: overridesRules = {} } = options
  return [
    createSVGOConfig({
      name: 'ntnyq/svgo',
      files,
      rules: {
        'svgo/svgo': 'error',

        ...overridesRules,
      },
    }),
  ]
}
