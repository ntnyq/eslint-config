import createGitIgnoreConfig from 'eslint-config-flat-gitignore'
import type { ConfigGitIgnoreOptions, TypedConfigItem } from '../types'

export const gitignore = (options: ConfigGitIgnoreOptions = {}): TypedConfigItem[] => [
  {
    ...createGitIgnoreConfig(options),
    name: 'ntnyq/gitignore',
  },
]
