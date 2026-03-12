import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  platform: 'node',
  deps: {
    neverBundle: ['prettier'],
  },
  dts: {
    tsgo: true,
  },
})
