import process from 'node:process'
import { getPackageInfoSync } from 'local-pkg'
import { defineFlatConfig } from 'eslint-define-config'
import { GLOB_VUE } from '../shared'
import { parserVue, pluginTs, pluginVue } from '../plugins'
import { typescript } from './typescript'
import type { FlatESLintConfig } from 'eslint-define-config'

export function getVueVersion() {
  const pkg = getPackageInfoSync('vue', { paths: [process.cwd()] })
  if (pkg && typeof pkg.version === 'string' && !Number.isNaN(+pkg.version[0])) {
    return +pkg.version[0]
  }
  return 3
}
const isVue3 = getVueVersion() === 3

const vueBaseRules: FlatESLintConfig['rules'] = {}

const vue2Rules: FlatESLintConfig['rules'] = {
  ...vueBaseRules,
}

const vue3Rules: FlatESLintConfig['rules'] = {
  ...vueBaseRules,
}

export const vue = defineFlatConfig([
  {
    files: [GLOB_VUE],
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': pluginTs as any,
    },
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...typescript[0].rules,
    },
  },
  {
    plugins: {
      vue: pluginVue,
    },
    rules: isVue3 ? vue3Rules : vue2Rules,
  },
])
