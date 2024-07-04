import { defineConfig } from '../types'
import { parserYaml, pluginYaml } from '../plugins'
import { GLOB_YAML } from '../globs'
import type { ESLintPlugin, RuleRecord } from '../types'

export const yml = defineConfig([
  {
    name: 'ntnyq/yaml',
    files: [GLOB_YAML],
    languageOptions: {
      parser: parserYaml,
    },
    plugins: {
      yml: pluginYaml as ESLintPlugin,
    },
    rules: {
      ...(pluginYaml.configs.standard.rules as RuleRecord),
      ...(pluginYaml.configs.prettier.rules as RuleRecord),
      'yml/no-empty-mapping-value': 'off',
      'yml/quotes': ['error', { avoidEscape: false, prefer: 'single' }],
    },
  },
])
