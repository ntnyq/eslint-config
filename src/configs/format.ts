import { DEFAULT_PRETTIER_OPTIONS } from '../constants'
import { parserPlain, pluginFormat } from '../eslint'
import {
  GLOB_CSS,
  GLOB_HTML,
  GLOB_LESS,
  GLOB_POSTCSS,
  GLOB_SCSS,
} from '../globs'
import { mergePrettierOptions } from '../utils'
import type {
  ConfigFormatOptions,
  PrettierOptions,
  TypedConfigItem,
} from '../types'

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
    ...DEFAULT_PRETTIER_OPTIONS,
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
