import { getPackageInfoSync } from 'local-pkg'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import { GLOB_VUE } from '../shared'
import { ts } from './ts'
import type { FlatESLintConfig, Rules } from 'eslint-define-config'

export { vueParser, vuePlugin }

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

export const vue: FlatESLintConfig[] = [
  {
    files: [GLOB_VUE],
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: vueParser as any,
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
      // @ts-expect-error 2339
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
