import { PRETTIER_DEFAULT_OPTIONS } from '../constants'
import { parserPlain, pluginFormat } from '../eslint'
import {
  GLOB_CSS,
  GLOB_HTML,
  GLOB_LESS,
  GLOB_POSTCSS,
  GLOB_SCSS,
} from '../globs'
import { mergePrettierOptions } from '../utils'
import type { PrettierOptions, TypedConfigItem } from '../types'

/**
 * Options type of {@link configFormat}
 */
export interface ConfigFormatOptions {
  /**
   * Enable formatter support for css, less, scss, sass and etc.
   *
   * @default true
   */
  css?: boolean

  /**
   * Enable formatter support for html
   *
   * @default true
   */
  html?: boolean

  /**
   * Options for prettier
   */
  prettierOptions?: PrettierOptions
}

/**
 * Config to use a formatter
 *
 * @see {@link https://github.com/antfu/eslint-plugin-format}
 *
 * @param options - {@link ConfigFormatOptions}
 * @returns ESLint configs
 */
export const configFormat = (
  options: ConfigFormatOptions = {},
): TypedConfigItem[] => {
  const {
    css: enableCSS = true,
    html: enableHTML = true,
    // user custom options
    prettierOptions = {},
  } = options

  const sharedPrettierOptions: PrettierOptions = {
    ...PRETTIER_DEFAULT_OPTIONS,
    ...prettierOptions,
  }

  const configs: TypedConfigItem[] = [
    {
      name: 'ntnyq/format/setup',
      plugins: {
        format: pluginFormat,
      },
    },
  ]

  if (enableCSS) {
    configs.push(
      {
        name: 'ntnyq/format/css',
        files: [GLOB_CSS, GLOB_POSTCSS],
        languageOptions: {
          parser: parserPlain,
        },
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(sharedPrettierOptions, {
              parser: 'css',
            }),
          ],
        },
      },
      {
        name: 'ntnyq/format/scss',
        files: [GLOB_SCSS],
        languageOptions: {
          parser: parserPlain,
        },
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(sharedPrettierOptions, {
              parser: 'scss',
            }),
          ],
        },
      },
      {
        name: 'ntnyq/format/less',
        files: [GLOB_LESS],
        languageOptions: {
          parser: parserPlain,
        },
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(sharedPrettierOptions, {
              parser: 'less',
            }),
          ],
        },
      },
    )
  }

  if (enableHTML) {
    configs.push({
      name: 'ntnyq/format/html',
      files: [GLOB_HTML],
      languageOptions: {
        parser: parserPlain,
      },
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions(sharedPrettierOptions, {
            parser: 'html',
          }),
        ],
      },
    })
  }

  return configs
}
