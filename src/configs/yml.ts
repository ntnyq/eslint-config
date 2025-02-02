import { parserYaml, pluginYml } from '../eslint'
import { GLOB_YAML } from '../globs'
import type { ConfigYmlOptions, TypedConfigItem } from '../types'

export const yml = (options: ConfigYmlOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/yml',
    files: [GLOB_YAML],
    languageOptions: {
      parser: parserYaml,
    },
    plugins: {
      yml: pluginYml,
    },
    rules: {
      ...(pluginYml.configs.standard as TypedConfigItem).rules,
      ...(pluginYml.configs.prettier as TypedConfigItem).rules,

      'yml/no-empty-mapping-value': 'off',
      'yml/quotes': ['error', { avoidEscape: false, prefer: 'single' }],

      // Overrides rules
      ...options.overrides,
    },
  },
]
