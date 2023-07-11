import ymlPlugin, { configs } from 'eslint-plugin-yml'
import * as ymlParser from 'yaml-eslint-parser'
import { GLOB_YAML } from '../shared'
import type { FlatESLintConfig } from 'eslint-define-config'

export const yml: FlatESLintConfig[] = [
  {
    files: [GLOB_YAML],
    languageOptions: {
      // @ts-expect-error 2322
      parser: ymlParser,
    },
    plugins: {
      yml: ymlPlugin,
    },
    // @ts-expect-error 2322
    rules: {
      ...configs.standard.rules,
      ...configs.prettier.rules,
      'yml/no-empty-mapping-value': 'off',
    },
  },
]
