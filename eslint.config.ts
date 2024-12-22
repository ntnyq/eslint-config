// @ts-check

import { defineESLintConfig } from './src'

export default defineESLintConfig({
  svgo: true,
  test: true,
  unocss: true,
  vue: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
})
