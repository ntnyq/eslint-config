import { defineESLintConfig } from './src'

export default defineESLintConfig({
  eslintPlugin: true,
  pnpm: true,
  svgo: true,
  test: true,
  unocss: true,
  vue: true,
  specials: {
    shadcnVue: true,
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
})
