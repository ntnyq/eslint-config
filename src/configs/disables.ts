import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import type { TypedConfigItem } from '../types'

export const disables = (): TypedConfigItem[] => [
  {
    name: 'ntnyq/disables/scripts',
    files: [`**/scripts/${GLOB_SRC}`],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    name: 'ntnyq/disables/cli',
    files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
]
