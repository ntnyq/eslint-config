/**
 * @file plugins & parsers
 */

import tseslint from 'typescript-eslint'

export { tseslint }

export * as pluginRegexp from 'eslint-plugin-regexp'
export { default as pluginNode } from 'eslint-plugin-n'
export { default as pluginVue } from 'eslint-plugin-vue'
export { default as pluginYaml } from 'eslint-plugin-yml'
export { default as pluginToml } from 'eslint-plugin-toml'
export { default as pluginJsonc } from 'eslint-plugin-jsonc'
export { default as pluginJsdoc } from 'eslint-plugin-jsdoc'
export { default as pluginUnoCSS } from '@unocss/eslint-plugin'
export { default as pluginUnicorn } from 'eslint-plugin-unicorn'
export { default as pluginImport } from 'eslint-plugin-import-x'
export { default as pluginPrettier } from 'eslint-plugin-prettier'
export { default as pluginMarkdown } from 'eslint-plugin-markdown'
export { default as pluginPerfectionist } from 'eslint-plugin-perfectionist'
export { default as pluginUnusedImports } from '@antfu/eslint-plugin-unused-imports'
export { default as pluginComments } from '@eslint-community/eslint-plugin-eslint-comments'

export * as parserToml from 'toml-eslint-parser'
export * as parserYaml from 'yaml-eslint-parser'
export * as parserVue from 'vue-eslint-parser'
export * as parserJsonc from 'jsonc-eslint-parser'
