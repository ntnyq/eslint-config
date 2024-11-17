import { pluginFormat } from '../eslint'
import { GLOB_CSS, GLOB_HTML, GLOB_LESS, GLOB_POSTCSS, GLOB_SCSS } from '../globs'
import { mergePrettierOptions } from '../utils'
import type { ConfigFormatOptions, TypedConfigItem } from '../types'

export const format = (options: ConfigFormatOptions = {}): TypedConfigItem[] => {
  const { css: enableCSS = true, html: enableHTML = true } = options
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
        languageOptions: {},
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(
              {},
              {
                parser: 'css',
              },
            ),
          ],
        },
      },
      {
        name: 'ntnyq/format/scss',
        files: [GLOB_SCSS],
        languageOptions: {},
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(
              {},
              {
                parser: 'scss',
              },
            ),
          ],
        },
      },
      {
        name: 'ntnyq/format/less',
        files: [GLOB_LESS],
        languageOptions: {},
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(
              {},
              {
                parser: 'less',
              },
            ),
          ],
        },
      },
    )
  }

  if (enableHTML) {
    configs.push({
      name: 'ntnyq/format/html',
      files: [GLOB_HTML],
      languageOptions: {},
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions(
            {},
            {
              parser: 'html',
            },
          ),
        ],
      },
    })
  }

  return configs
}
