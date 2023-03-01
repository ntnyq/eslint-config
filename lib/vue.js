import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import { GLOB_EXCLUDE, GLOB_VUE } from './shared.js'

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const vue = [
  {
    files: [GLOB_VUE],
    ignores: GLOB_EXCLUDE,
    plugins: {
      vue: vuePlugin,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      ...vuePlugin.configs['vue3-recommended'],
    },
  },
]
