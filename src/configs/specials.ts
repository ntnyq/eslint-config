import globals from 'globals'
import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import type { TypedConfigItem } from '../types'

export const specials = (): TypedConfigItem[] => [
  {
    name: 'ntnyq/specials/scripts',
    files: [`**/scripts/${GLOB_SRC}`],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    name: 'ntnyq/specials/cli',
    files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    name: 'ntnyq/specials/userscript',
    files: [`**/*.user.${GLOB_SRC_EXT}`],
    languageOptions: {
      globals: {
        ...globals.greasemonkey,
      },
    },
    rules: {
      camelcase: [
        'error',
        {
          allow: ['^GM_.+'],
        },
      ],
    },
  },
]
