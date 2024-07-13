import createCommandPlugin from 'eslint-plugin-command/config'
import { defineConfig } from '../utils'

export const command = defineConfig([createCommandPlugin()])
