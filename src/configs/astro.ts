import { pluginAstro } from '../plugins'
import { parserAstro } from '../parsers'
import { GLOB_ASTRO } from '../shared'
import type { FlatESLintConfigItem, Rules } from 'eslint-define-config'

export const astro: FlatESLintConfigItem[] = [
  {
    files: [GLOB_ASTRO],
    plugins: {
      astro: pluginAstro,
    },
    languageOptions: {
      parser: parserAstro,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      ...(pluginAstro.configs.recommended.rules as Rules),
    },
  },
]
