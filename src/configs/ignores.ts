import { defineFlatConfig } from 'eslint-define-config'
import { GLOB_EXCLUDE } from '../globs'

/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
 */
export const ignores = defineFlatConfig([
  {
    ignores: GLOB_EXCLUDE,
  },
])
