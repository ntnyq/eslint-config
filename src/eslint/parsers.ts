/**
 * @file ESLint parsers
 */

import tseslint from 'typescript-eslint'

/**
 * With meta
 */
export const parserTypeScript = tseslint.parser

export * as parserVue from 'vue-eslint-parser'
export * as parserToml from 'toml-eslint-parser'
export * as parserYaml from 'yaml-eslint-parser'
export * as parserJsonc from 'jsonc-eslint-parser'
