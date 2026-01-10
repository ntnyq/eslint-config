import { parserPlain, pluginOxfmt } from '../eslint'
import { GLOB_SRC } from '../globs'
import type {
  OptionsFiles,
  OptionsIgnores,
  OptionsOverrides,
  TypedConfigItem,
} from '../types'

/**
 * Options type of {@link configOxfmt}
 */
export interface ConfigOxfmtOptions
  extends OptionsOverrides, OptionsFiles, OptionsIgnores {}

/**
 * Config for use oxfmt
 *
 * @see {@link https://github.com/ntnyq/eslint-plugin-oxfmt}
 *
 * @returns ESLint configs
 */
export const configOxfmt = (
  options: ConfigOxfmtOptions = {},
): TypedConfigItem[] => {
  const { files = [GLOB_SRC], ignores = [] } = options
  return [
    {
      name: 'ntnyq/oxfmt',
      files,
      ignores,
      plugins: {
        oxfmt: pluginOxfmt,
      },
      languageOptions: {
        parser: parserPlain,
      },
      rules: {
        'oxfmt/oxfmt': 'error',

        ...options.overrides,
      },
    },
  ]
}
