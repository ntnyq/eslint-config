import { parserYaml, pluginYaml } from '../eslint'
import { GLOB_YAML } from '../globs'
import type { ConfigYmlOptions, TypedConfigItem } from '../types'

export const yml = (options: ConfigYmlOptions = {}): TypedConfigItem[] => [
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
      ...(pluginYaml.configs.standard.rules as TypedConfigItem['rules']),
      ...(pluginYaml.configs.prettier.rules as TypedConfigItem['rules']),

      'yml/no-empty-mapping-value': 'off',
      'yml/quotes': ['error', { avoidEscape: false, prefer: 'single' }],

      // Overrides rules
      ...options.overrides,
    },
  },
]
