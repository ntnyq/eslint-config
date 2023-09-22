import { GLOB_JSX, GLOB_TSX } from '../shared'
import { pluginReact, pluginReactHooks } from '../plugins'
import type { FlatESLintConfigItem } from 'eslint-define-config'

export const react: FlatESLintConfigItem[] = [
  {
    files: [GLOB_JSX, GLOB_TSX],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
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
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'jsx-quotes': ['error', 'prefer-double'],
      'react/react-in-jsx-scope': 'off',
    },
  },
]
