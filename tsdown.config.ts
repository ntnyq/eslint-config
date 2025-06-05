import { consola } from 'consola'
import { getColor } from 'consola/utils'
import { defineConfig } from 'tsdown'
import { generateTypes } from './scripts/generateType'

const cyan = getColor('cyan')

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  hooks: {
    'build:before': async () => {
      consola.info(`${cyan('TYPES')} start generating types...`)
      await generateTypes()
      consola.success(`${cyan('TYPES')} generated success.`)
    },
  },
})
