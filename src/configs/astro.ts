import { defineFlatConfig } from 'eslint-define-config'
import { parserAstro, pluginAstro } from '../plugins'
import { GLOB_ASTRO } from '../shared'
import type { Rules } from 'eslint-define-config'

export const astro = defineFlatConfig([
  {
    files: [GLOB_ASTRO],
    plugins: {
      astro: pluginAstro as any,
    },
    languageOptions: {
      parser: parserAstro,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      ...(pluginAstro.configs.recommended.rules as unknown as Rules),
    },
  },
])
