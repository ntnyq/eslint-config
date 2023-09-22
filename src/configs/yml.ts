import { pluginYml } from '../plugins'
import { parserYml } from '../parsers'
import { GLOB_YAML } from '../shared'
import type { FlatESLintConfigItem, Rules } from 'eslint-define-config'

export const yml: FlatESLintConfigItem[] = [
  {
    files: [GLOB_YAML],
    languageOptions: {
      parser: parserYml,
    },
    plugins: {
      yml: pluginYml,
    },
    rules: {
      ...(pluginYml.configs.standard.rules as Rules),
      ...(pluginYml.configs.prettier.rules as Rules),
      'yml/no-empty-mapping-value': 'off',
      'yml/quotes': ['error', { avoidEscape: false, prefer: 'single' }],
    },
  },
]
