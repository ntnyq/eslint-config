/**
 * @file plugins & parsers
 */

/* eslint-disable import/first */

export type InteropDefault<T> = T extends { default: infer U } ? U : T

/* #__NO_SIDE_EFFECTS__ */
export function interopDefault<T>(m: T): InteropDefault<T> {
  return (m as any).default || m
}

export { default as pluginNode } from 'eslint-plugin-n'
export { default as pluginVue } from 'eslint-plugin-vue'
export { default as pluginUnoCSS } from '@unocss/eslint-plugin'
export { default as pluginUnicorn } from 'eslint-plugin-unicorn'
export { default as pluginPrettier } from 'eslint-plugin-prettier'
export { default as pluginMarkdown } from 'eslint-plugin-markdown'
export { default as pluginComments } from 'eslint-plugin-eslint-comments'
export { default as pluginYaml } from 'eslint-plugin-yml'
export { default as pluginJsonc } from 'eslint-plugin-jsonc'
export { default as pluginImport } from 'eslint-plugin-import-x'
export { default as pluginJsdoc } from 'eslint-plugin-jsdoc'

import tseslint from 'typescript-eslint'

export { tseslint }

export * as parserYaml from 'yaml-eslint-parser'
export * as parserVue from 'vue-eslint-parser'
export * as parserJsonc from 'jsonc-eslint-parser'
