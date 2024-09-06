import createGitIgnore from 'eslint-config-flat-gitignore'
import type { ConfigGitIgnoreOptions, TypedConfigItem } from '../types'

export const gitignore = (options: ConfigGitIgnoreOptions = {}): TypedConfigItem[] => [
  {
    ...createGitIgnore(options),
    name: 'ntnyq/gitignore',
  },
]
