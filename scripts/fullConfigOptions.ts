import type { ConfigOptions } from '../src/types'

export const FULL_CONFIG_OPTIONS: ConfigOptions = {
  __DEV__: true,
  astro: true,
  eslintPlugin: true,
  html: true,
  oxfmt: true,
  pinia: true,
  pnpm: true,
  shell: true,
  specials: {
    shadcnVue: true,
  },
  svelte: true,
  svgo: true,
  test: {
    vitest: true,
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  unocss: true,
  unusedImports: true,
  vue: {
    vuePerfectionist: true,
  },
}
