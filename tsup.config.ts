import { defineConfig } from 'tsup'

export default defineConfig({
  dts: true,
  clean: true,
  target: 'node18',
  format: ['esm', 'cjs'],
  entry: ['src/index.ts'],
})
