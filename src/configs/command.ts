import createCommandConfig from 'eslint-plugin-command/config'
import type { ConfigCommandOptions, TypedConfigItem } from '../types'

export const command = (options: ConfigCommandOptions = {}): TypedConfigItem[] => [
  {
    ...createCommandConfig(options),
    name: 'ntnyq/command',
  },
]
