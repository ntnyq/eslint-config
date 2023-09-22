import process from 'node:process'
import { getPackageInfoSync } from 'local-pkg'
import { GLOB_VUE } from '../shared'
import { parserVue } from '../parsers'
import { pluginTypeScript, pluginVue } from '../plugins'
import { typescript } from './typescript'
import type { FlatESLintConfigItem, Rules } from 'eslint-define-config'

export function getVueVersion() {
  const pkg = getPackageInfoSync('vue', { paths: [process.cwd()] })
  if (pkg && typeof pkg.version === 'string' && !Number.isNaN(+pkg.version[0])) {
    return +pkg.version[0]
  }
  return 3
}
const isVue3 = getVueVersion() === 3

const vueBaseRules: Rules = {}

const vue2Rules: Rules = {
  ...vueBaseRules,
}

const vue3Rules: Rules = {
  ...vueBaseRules,
}

export const vue: FlatESLintConfigItem[] = [
  {
    files: [GLOB_VUE],
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': pluginTypeScript,
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
]
