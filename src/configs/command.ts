import createCommandPlugin from 'eslint-plugin-command/config'
import { defineConfig } from '../types'

export const command = defineConfig([createCommandPlugin()])
