import { getPackageInfoSync } from 'local-pkg'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import { ts } from './ts.js'
import { GLOB_VUE } from './shared.js'

export { vueParser, vuePlugin }

export function getVueVersion() {
  const pkg = getPackageInfoSync('vue', { paths: [process.cwd()] })
  if (pkg && typeof pkg.version === 'string' && !Number.isNaN(+pkg.version[0])) {
    return +pkg.version[0]
  }
  return 3
}
const isVue3 = getVueVersion() === 3

/** @type {import('eslint-define-config').Rules} */
const vueBaseRules = {}

/** @type {import('eslint-define-config').Rules} */
const vue2Rules = {
  ...vueBaseRules,
}

/** @type {import('eslint-define-config').Rules} */
const vue3Rules = {
  ...vueBaseRules,
}

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const vue = [
  {
    files: [GLOB_VUE],
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    processor: vuePlugin.processors['.vue'],
    rules: {
      ...ts[0].rules,
    },
  },
  {
    plugins: {
      vue: vuePlugin,
    },
    rules: isVue3 ? vue3Rules : vue2Rules,
  },
]
