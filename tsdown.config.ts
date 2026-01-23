import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  inlineOnly: false,
  platform: 'node',
  dts: {
    tsgo: true,
  },
})
