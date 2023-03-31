import ymlPlugin, { configs } from 'eslint-plugin-yml'
import ymlParser from 'yaml-eslint-parser'
import { GLOB_YAML } from './shared.js'

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const yml = [
  {
    files: [GLOB_YAML],
    languageOptions: {
      parser: ymlParser,
    },
    plugins: {
      yml: ymlPlugin,
    },
    rules: {
      ...configs.standard.rules,
      ...configs.prettier.rules,
      'yml/no-empty-mapping-value': 'off',
    },
  },
]
