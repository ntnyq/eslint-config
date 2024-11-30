import { defineESLintConfig } from './src'

export default defineESLintConfig({
  vue: true,
  test: true,
  unocss: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
})
