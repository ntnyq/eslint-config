import { GLOB_HTML } from '../globs'
import { ensurePackages, interopDefault } from '../utils'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configHtml}
 */
export type ConfigHtmlOptions = OptionsFiles & OptionsOverrides

/**
 * Config for html files
 *
 * @see {@link https://github.com/yeonjuan/html-eslint}
 *
 * @param options - {@link ConfigHtmlOptions}
 * @returns ESLint configs
 */
export const configHtml = async (
  options: ConfigHtmlOptions = {},
): Promise<TypedConfigItem[]> => {
  await ensurePackages(['@html-eslint/parser', '@html-eslint/eslint-plugin'])

  const [parserHtml, pluginHtml] = await Promise.all([
    interopDefault(import('@html-eslint/parser')),
    interopDefault(import('@html-eslint/eslint-plugin')),
  ])

  const { files = [GLOB_HTML] } = options
  return [
    {
      name: 'ntnyq/html',
      files,
      plugins: {
        '@html-eslint': pluginHtml,
      },
      languageOptions: {
        parser: parserHtml,
      },
      rules: {
        '@html-eslint/attrs-newline': 'error',
        '@html-eslint/element-newline': [
          'error',
          {
            inline: ['$inline'],
          },
        ],
        '@html-eslint/indent': 'error',
        '@html-eslint/no-duplicate-attrs': 'error',
        '@html-eslint/no-duplicate-id': 'error',
        '@html-eslint/no-extra-spacing-attrs': 'error',
        '@html-eslint/no-multiple-h1': 'error',
        '@html-eslint/no-obsolete-tags': 'error',
        '@html-eslint/quotes': 'error',
        '@html-eslint/require-closing-tags': 'error',
        '@html-eslint/require-doctype': 'error',
        '@html-eslint/require-img-alt': 'error',
        '@html-eslint/require-lang': 'error',
        '@html-eslint/require-li-container': 'error',
        '@html-eslint/require-title': 'error',
        '@html-eslint/use-baseline': 'error',

        ...options.overrides,
      },
    },
  ]
}
