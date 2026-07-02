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
    files: nativeFiles = [
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
    filesExtensions: plainParserFiles = [GLOB_STYLE, GLOB_HTML],
  } = options
  return [
    {
      name: 'ntnyq/oxfmt/native-files',
      files: nativeFiles,
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
      name: 'ntnyq/oxfmt/plain-parser-files',
      files: plainParserFiles,
      ignores: nativeFiles.flat(),
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
