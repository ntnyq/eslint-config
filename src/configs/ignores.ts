import { GLOB_EXCLUDE } from '../shared'
import type { FlatESLintConfigItem } from 'eslint-define-config'

/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
 */
export const ignores: FlatESLintConfigItem[] = [
  {
    ignores: GLOB_EXCLUDE,
  },
]
