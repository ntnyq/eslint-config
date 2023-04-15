import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import { GLOB_JSX, GLOB_TSX } from '../shared.js'
import type { FlatESLintConfig } from 'eslint-define-config'

export { reactPlugin, reactHooksPlugin }

export const react: FlatESLintConfig[] = [
  {
    files: [GLOB_JSX, GLOB_TSX],
    plugins: {
      react: reactPlugin,
      reactHooks: reactHooksPlugin,
    },
    settings: {
      react: {
        version: '18.0',
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'jsx-quotes': ['error', 'prefer-double'],
      'react/react-in-jsx-scope': 'off',
    },
  },
]
