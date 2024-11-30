import { defineESLintConfig } from './src'

export default defineESLintConfig({
  test: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  unocss: true,
  vue: true,
})
