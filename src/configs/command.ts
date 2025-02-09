import { builtinCommands } from 'eslint-plugin-command/commands'
import createCommandConfig from 'eslint-plugin-command/config'
import { commands as internalCommands } from '../commands'
import type { ConfigCommandOptions, TypedConfigItem } from '../types'

export const configCommand = (
  options: ConfigCommandOptions = {},
): TypedConfigItem[] => [
  {
    ...createCommandConfig({
      ...options,
      commands: [
        // built-in commands
        ...builtinCommands,

        // config internal commands
        ...internalCommands,

        // user custom commands
        ...(options.commands || []),
      ],
    }),
    name: 'ntnyq/command',
  },
]
