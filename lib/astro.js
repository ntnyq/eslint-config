import astroPlugin, { configs } from 'eslint-plugin-astro'
import astroParser from 'astro-eslint-parser'
import { GLOB_ASTRO } from './shared.js'

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const astro = [
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
    rules: {
      ...configs.recommended,
    },
  },
]
