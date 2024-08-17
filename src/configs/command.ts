import createCommandPlugin from 'eslint-plugin-command/config'
import type { LinterConfig } from '../types'

export const command = (): LinterConfig[] => [
  {
    ...createCommandPlugin(),
    name: 'ntnyq/command',
  },
]
