import { GLOB_EXCLUDE } from '../globs'
import type { TypedConfigItem } from '../types'

/**
 * Options type for {@link configIgnores}
 */
export type ConfigIgnoresOptions = string[]

/**
 * Config for ignore files from linting
 *
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
 *
 * @param customIgnores - {@link ConfigIgnoresOptions}
 * @returns ESLint configs
 */
export const configIgnores = (
  customIgnores: ConfigIgnoresOptions = [],
): TypedConfigItem[] => [
  {
    name: 'ntnyq/ignores',
    ignores: [
      ...GLOB_EXCLUDE,

      // Overrides built-in ignores
      ...customIgnores,
    ],
  },
]
