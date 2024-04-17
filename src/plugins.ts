/**
 * @file plugins & parsers
 */

// @ts-nocheck

export { default as pluginNode } from 'eslint-plugin-n'
export { default as pluginVue } from 'eslint-plugin-vue'
export { default as pluginUnoCSS } from '@unocss/eslint-plugin'
export { default as pluginUnicorn } from 'eslint-plugin-unicorn'
export { default as pluginPrettier } from 'eslint-plugin-prettier'
export { default as pluginMarkdown } from 'eslint-plugin-markdown'
export { default as pluginComments } from 'eslint-plugin-eslint-comments'
export { default as pluginTs } from '@typescript-eslint/eslint-plugin'

export * as pluginYaml from 'eslint-plugin-yml'
export * as pluginJsonc from 'eslint-plugin-jsonc'
export * as pluginImport from 'eslint-plugin-import-x'

export * as parserYaml from 'yaml-eslint-parser'
export * as parserVue from 'vue-eslint-parser'
export * as parserJsonc from 'jsonc-eslint-parser'

export * as parserTs from '@typescript-eslint/parser'
