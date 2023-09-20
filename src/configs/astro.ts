import astroPlugin, { configs } from 'eslint-plugin-astro'
import * as astroParser from 'astro-eslint-parser'
import { GLOB_ASTRO } from '../shared'
import type { FlatESLintConfig } from 'eslint-define-config'

export const astro: FlatESLintConfig[] = [
  {
    files: [GLOB_ASTRO],
    plugins: {
      astro: astroPlugin,
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    // @ts-expect-error 2322
    rules: {
      ...configs.recommended.rules,
    },
  },
]
