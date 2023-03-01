import jsoncPlugin, { configs } from 'eslint-plugin-jsonc'
import jsoncParser from 'jsonc-eslint-parser'
import { GLOB_EXCLUDE, GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from './shared.js'

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const jsonc = [
  {
    files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC, '**/*rc'],
    ignores: GLOB_EXCLUDE,
    plugins: {
      jsonc: jsoncPlugin,
    },
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      ...configs['recommended-with-jsonc'].rules,
    },
  },
]

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const pkgOrder = [
  {
    files: ['**/package.json'],
    rules: {},
  },
]
