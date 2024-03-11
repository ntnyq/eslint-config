import { defineFlatConfig } from 'eslint-define-config'
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_VUE } from '../shared'
import { pluginMarkdown, pluginTs } from '../plugins'

export const markdown = defineFlatConfig([
  {
    files: [GLOB_MARKDOWN],
    plugins: {
      markdown: pluginMarkdown,
    },
    processor: 'markdown/markdown',
  },
  {
    files: [`${GLOB_MARKDOWN}/${GLOB_SRC}`, `${GLOB_MARKDOWN}/${GLOB_VUE}`],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
    },
    rules: {
      ...pluginMarkdown.configs['recommended-legacy'].overrides[1].rules,
      'no-undef': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
      'no-unused-expressions': 'off',
      'no-restricted-imports': 'off',

      'import/no-unresolved': 'off',

      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-use-before-define': 'off',

      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
])
