// @ts-check

import { defineESLintConfig } from './src'

export default defineESLintConfig({
  test: true,
  unocss: true,
  vue: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
})
