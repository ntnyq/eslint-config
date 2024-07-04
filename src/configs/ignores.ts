import { defineConfig } from '../types'
import { GLOB_EXCLUDE } from '../globs'

/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
 */
export const ignores = defineConfig([
  {
    name: 'ntnyq/ignores',
    ignores: GLOB_EXCLUDE,
  },
])
