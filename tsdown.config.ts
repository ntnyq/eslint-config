import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  platform: 'node',
  dts: {
    tsgo: true,
  },
})
