import markdownPlugin from 'eslint-plugin-markdown'
import { GLOB_EXCLUDE, GLOB_MARKDOWN } from './shared.js'

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const markdown = [
  {
    files: [GLOB_MARKDOWN],
    ignores: GLOB_EXCLUDE,
    plugins: {
      markdown: markdownPlugin,
    },
    processor: 'markdown/markdown',
  },
  {
    files: ['**/*.md/*'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    rules: {
      ...markdownPlugin.configs.recommended.overrides[1].rules,
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
      '@typescript-eslint/no-use-before-define': 'off',

      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
]
