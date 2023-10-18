import { parserYaml, pluginYaml } from '../plugins'
import { GLOB_YAML } from '../shared'
import type { FlatESLintConfigItem, Rules } from 'eslint-define-config'

export const yml: FlatESLintConfigItem[] = [
  {
    files: [GLOB_YAML],
    languageOptions: {
      parser: parserYaml,
    },
    plugins: {
      yml: pluginYaml as any,
    },
    rules: {
      ...(pluginYaml.configs.standard.rules as Rules),
      ...(pluginYaml.configs.prettier.rules as Rules),
      'yml/no-empty-mapping-value': 'off',
      'yml/quotes': ['error', { avoidEscape: false, prefer: 'single' }],
    },
  },
]
