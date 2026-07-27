import createGitIgnoreConfig from 'eslint-config-flat-gitignore'
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { TypedConfigItem } from '../types'

/**
 * Options type of {@link configGitIgnore}
 */
export type ConfigGitIgnoreOptions = Omit<FlatGitignoreOptions, 'strict'> & {
  /**
   * Throw an error if gitignore file not found.
   *
   * @default false
   */
  strict?: boolean
}

/**
 * Config for respect `.gitignore`
 *
 * @see {@link https://github.com/antfu/eslint-config-flat-gitignore}
 *
 * @param options - {@link ConfigGitIgnoreOptions}
 * @returns ESLint configs
 */
export const configGitIgnore = (
  options: ConfigGitIgnoreOptions = {},
): TypedConfigItem[] => {
  return [
    {
      ...createGitIgnoreConfig({
        ...options,
        // Won't throw error if gitignore is missing
        strict: options.strict ?? false,
      }),
      name: 'ntnyq/gitignore',
    },
  ]
}
