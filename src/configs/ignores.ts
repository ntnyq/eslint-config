import { GLOB_EXCLUDE } from '../globs'
import type { TypedConfigItem } from '../types'

/**
 * Options type for {@link configIgnores}
 *
 * Passing an array to extend the built-in ignores
 * Passing a function to modify the built-in ignores
 */
export type ConfigIgnoresOptions = string[] | ((ignores: string[]) => string[])

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
): TypedConfigItem[] => {
  let ignores: string[] = [...GLOB_EXCLUDE]

  if (typeof customIgnores === 'function') {
    ignores = customIgnores(ignores)
  } else {
    ignores.push(...customIgnores)
  }

  return [
    {
      name: 'ntnyq/ignores',
      ignores,
    },
  ]
}
