import { defineESLintConfig } from './src'

export default defineESLintConfig({
  astro: true,
  eslintPlugin: true,
  html: true,
  oxfmt: true,
  pnpm: true,
  svelte: true,
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
