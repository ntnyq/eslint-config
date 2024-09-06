import createCommandPlugin from 'eslint-plugin-command/config'
import type { ConfigCommandOptions, TypedConfigItem } from '../types'

export const command = (options: ConfigCommandOptions = {}): TypedConfigItem[] => [
  {
    ...createCommandPlugin(options),
    name: 'ntnyq/command',
  },
]
