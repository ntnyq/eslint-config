/**
 * @file ESLint parsers
 */

import type { ESLintParser } from '../types'

export * as parserVue from 'vue-eslint-parser'
export * as parserToml from 'toml-eslint-parser'
export * as parserYaml from 'yaml-eslint-parser'
export * as parserJsonc from 'jsonc-eslint-parser'
export { parser as parserTypeScript } from 'typescript-eslint'

/**
 * @copyright {@link https://github.com/so1ve/eslint-parser-plain}
 */
export const parserPlain: ESLintParser = {
  meta: {
    name: 'plain-eslint-parser',
  },
  parseForESLint: (code: string) => ({
    ast: {
      body: [],
      comments: [],
      loc: { start: 0, end: code.length },
      range: [0, code.length],
      tokens: [],
      type: 'Program',
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: [],
    },
  }),
}
