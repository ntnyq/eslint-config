import { GLOB_EXCLUDE } from '../globs'
import type { ConfigIgnoresOptions, LinterConfig } from '../types'

/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
 */
export const ignores = (customIgnores: ConfigIgnoresOptions = []): LinterConfig[] => [
  {
    name: 'ntnyq/ignores',
    ignores: [
      ...GLOB_EXCLUDE,

      // Overrides built-in ignores
      ...customIgnores,
    ],
  },
]
