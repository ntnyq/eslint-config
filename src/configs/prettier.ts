import prettierConfig from 'eslint-config-prettier'
import { defineConfig } from '../utils'
import { pluginPrettier } from '../plugins'
import { GLOB_TOML } from '../globs'
import type { RuleRecordEntry } from '../types'

export const prettier = defineConfig([
  {
    name: 'ntnyq/prettier',
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...prettierConfig.rules,
      ...(pluginPrettier.configs!.recommended as RuleRecordEntry).rules,
      'prettier/prettier': 'warn',
    },
  },
  /**
   * Languages that prettier currently does not support
   */
  {
    name: 'ntnyq/prettier/ignore',
    files: [GLOB_TOML],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'off',
    },
  },
])
