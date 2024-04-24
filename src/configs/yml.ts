import { defineFlatConfig } from 'eslint-define-config'
import { parserYaml, pluginYaml } from '../plugins'
import { GLOB_YAML } from '../globs'
import type { Rules } from 'eslint-define-config'

export const yml = defineFlatConfig([
  {
    files: [GLOB_YAML],
    languageOptions: {
      parser: parserYaml,
    },
    plugins: {
      yml: pluginYaml,
    },
    rules: {
      ...(pluginYaml.configs.standard.rules as unknown as Rules),
      ...(pluginYaml.configs.prettier.rules as unknown as Rules),
      'yml/no-empty-mapping-value': 'off',
      'yml/quotes': ['error', { avoidEscape: false, prefer: 'single' }],
    },
  },
])
