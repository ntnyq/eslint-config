import { defineESLintConfig } from './src'

export default defineESLintConfig({
  vue: true,
  unocss: true,
  test: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
})
