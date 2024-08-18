import { GLOB_MARKDOWN, GLOB_SRC, GLOB_VUE } from '../globs'
import { pluginMarkdown } from '../plugins'
import type { ConfigMarkdownOptions, TypedConfigItem } from '../types'

export const markdown = (options: ConfigMarkdownOptions = {}): TypedConfigItem[] => [
  ...pluginMarkdown.configs.recommended,

  {
    name: 'ntnyq/markdown/extensions',
    files: [`${GLOB_MARKDOWN}/${GLOB_SRC}`, `${GLOB_MARKDOWN}/${GLOB_VUE}`],
    rules: {
      'no-undef': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
      'no-unused-expressions': 'off',
      'no-restricted-imports': 'off',

      'node/prefer-global/buffer': 'off',
      'node/prefer-global/process': 'off',

      'import/no-unresolved': 'off',

      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',

      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-use-before-define': 'off',

      // Overrides built-in rules
      ...options.overrides,
    },
  },
]
