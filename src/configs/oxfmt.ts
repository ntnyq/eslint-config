import { parserPlain, pluginOxfmt } from '../eslint'
import { GLOB_SRC, GLOB_SRC_EXTENSIONS, GLOB_VUE } from '../globs'
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
  extends OptionsOverrides, OptionsFiles, OptionsIgnores {
  filesExtensions?: string[]
}

/**
 * Config for using oxfmt
 *
 * @see {@link https://github.com/ntnyq/eslint-plugin-oxfmt}
 *
 * @returns ESLint configs
 */
export const configOxfmt = (
  options: ConfigOxfmtOptions = {},
): TypedConfigItem[] => {
  const {
    files = [GLOB_SRC, GLOB_VUE],
    ignores = [],
    filesExtensions = GLOB_SRC_EXTENSIONS,
  } = options
  return [
    {
      name: 'ntnyq/oxfmt/setup',
      plugins: {
        oxfmt: pluginOxfmt,
      },
    },
    {
      name: 'ntnyq/oxfmt/basic',
      files,
      ignores,
      rules: {
        'oxfmt/oxfmt': 'error',

        ...options.overrides,
      },
    },
    {
      name: 'ntnyq/oxfmt/extensions',
      files: filesExtensions,
      ignores: [GLOB_SRC, GLOB_VUE],
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
