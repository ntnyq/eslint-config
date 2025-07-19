import { parserPlain, pluginSvgo } from '../eslint'
import { GLOB_SVG } from '../globs'
import type {
  OptionsFiles,
  OptionsIgnores,
  OptionsOverrides,
  TypedConfigItem,
} from '../types'

/**
 * Options type of {@link configSVGO}
 */
export type ConfigSVGOOptions = OptionsFiles & OptionsIgnores & OptionsOverrides

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
  const { files = [GLOB_SVG], ignores = [] } = options

  return [
    {
      name: 'ntnyq/svgo',
      files,
      ignores,
      plugins: {
        svgo: pluginSvgo,
      },
      languageOptions: {
        parser: parserPlain,
      },
      rules: {
        'svgo/svgo': [
          'error',
          {
            plugins: ['preset-default'],
            js2svg: {
              indent: 2,
              pretty: true,
            },
          },
        ],

        ...options.overrides,
      },
    },
  ]
}
