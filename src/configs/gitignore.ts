import createGitIgnoreConfig from 'eslint-config-flat-gitignore'
import type { ConfigGitIgnoreOptions, TypedConfigItem } from '../types'

export const configGitIgnore = (options: ConfigGitIgnoreOptions = {}): TypedConfigItem[] => {
  // Won't throw error if gitignore is missing
  options.strict ??= false

  return [
    {
      ...createGitIgnoreConfig(options),
      name: 'ntnyq/gitignore',
    },
  ]
}
