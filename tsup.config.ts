import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  external: ['eslint-plugin-es-x'],
  format: ['esm', 'cjs'],
  target: 'node18',
})
