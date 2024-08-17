import { parserYaml, pluginYaml } from '../plugins'
import { GLOB_YAML } from '../globs'
import type { ConfigYmlOptions, LinterConfig, RuleRecord } from '../types'

export const yml = (options: ConfigYmlOptions = {}): LinterConfig[] => [
  {
    name: 'ntnyq/yaml',
    files: [GLOB_YAML],
    languageOptions: {
      parser: parserYaml,
    },
    plugins: {
      yml: pluginYaml,
    },
    rules: {
      ...(pluginYaml.configs.standard.rules as RuleRecord),
      ...(pluginYaml.configs.prettier.rules as RuleRecord),

      'yml/no-empty-mapping-value': 'off',
      'yml/quotes': ['error', { avoidEscape: false, prefer: 'single' }],

      // Overrides built-in rules
      ...options.overrides,
    },
  },
]
