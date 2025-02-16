import { createConfig as createSVGOConfig } from 'eslint-plugin-svgo'
import { GLOB_SVG } from '../globs'
import type { RuleOptions as SVGORuleOptions } from 'eslint-plugin-svgo/rule-options'
import type { ESLintConfig, TypedConfigItem } from '../types'

/**
 * Options type of {@link configSVGO}
 */
export type ConfigSVGOOptions = ESLintConfig<SVGORuleOptions>

/**
 * Config for svg files
 *
 * @see {@link https://github.com/ntnyq/eslint-plugin-svgo}
 *
 * @param options - {@link ConfigSVGOOptions}
 * @returns ESLint configs
 */
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
