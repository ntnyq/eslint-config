import createCommandPlugin from 'eslint-plugin-command/config'
import type { TypedConfigItem } from '../types'

export const command = (): TypedConfigItem[] => [
  {
    ...createCommandPlugin(),
    name: 'ntnyq/command',
  },
]
