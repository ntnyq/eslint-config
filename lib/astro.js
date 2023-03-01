import astroPlugin, { configs } from 'eslint-plugin-astro'
import astroParser from 'astro-eslint-parser'
import { GLOB_EXCLUDE, GLOB_ASTRO } from './shared.js'

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const astro = [
  {
    files: [GLOB_ASTRO],
    ignores: GLOB_EXCLUDE,
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
