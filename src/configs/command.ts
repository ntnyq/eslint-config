import { builtinCommands } from 'eslint-plugin-command/commands'
import createCommandConfig from 'eslint-plugin-command/config'
import { commands as internalCommands } from '../commands'
import type { ESLintPluginCommandOptions } from 'eslint-plugin-command/types'
import type { TypedConfigItem } from '../types'

/**
 * Options type of {@link configCommand}
 */
export type ConfigCommandOptions = ESLintPluginCommandOptions

/**
 * Config for useing comments as codemod
 *
 * @see {@link https://github.com/antfu/eslint-plugin-command}
 *
 * @param options - {@link ConfigCommandOptions}
 * @returns ESLint configs
 */
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
