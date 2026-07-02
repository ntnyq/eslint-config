import { parserPlain, pluginOxfmt } from '../eslint'
import {
  GLOB_HTML,
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_JSONC,
  GLOB_MARKDOWN,
  GLOB_SRC,
  GLOB_STYLE,
  GLOB_TOML,
  GLOB_VUE,
  GLOB_YAML,
} from '../globs'
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
    files: filesWithoutParser = [
      GLOB_SRC,
      GLOB_VUE,
      GLOB_JSON,
      GLOB_JSON5,
      GLOB_JSONC,
      GLOB_YAML,
      GLOB_TOML,
      GLOB_MARKDOWN,
    ],
    ignores: ignoresWithoutParser = [],
    filesExtensions: filesWithParser = [GLOB_STYLE, GLOB_HTML],
  } = options
  return [
    {
      name: 'ntnyq/oxfmt/without-parser',
      files: filesWithoutParser,
      ignores: ignoresWithoutParser,
      plugins: {
        oxfmt: pluginOxfmt,
      },
      rules: {
        'oxfmt/oxfmt': 'error',

        ...options.overrides,
      },
    },
    {
      name: 'ntnyq/oxfmt/with-parser',
      files: filesWithParser,
      ignores: filesWithoutParser.flat(),
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
