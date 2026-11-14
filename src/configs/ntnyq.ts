import { pluginNtnyq } from '../eslint'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configNtnyq}
 */
export type ConfigNtnyqOptions = OptionsOverrides

/**
 * Config for common files
 *
 * @see {@link https://github.com/ntnyq/eslint-plugin-ntnyq}
 *
 * @param options - {@link ConfigNtnyqOptions}
 * @returns ESLint configs
 */
export const configNtnyq = (
  options: ConfigNtnyqOptions = {},
): TypedConfigItem[] => [
  {
    name: 'ntnyq/ntnyq',
    plugins: {
      ntnyq: pluginNtnyq,
    },
    rules: {
      'ntnyq/no-duplicate-exports': 'error',
      'ntnyq/no-explicit-void-return-type': 'error',
      'ntnyq/no-restricted-bindings': [
        'error',
        {
          restrictions: [
            {
              message:
                'Use a domain name such as requestError; reserve error for catch parameters.',
              names: ['error'],
              except: ['catch-parameter'],
              regions: ['script', 'vue-script', 'vue-script-setup'],
              scope: 'top-level',
            },
          ],
        },
      ],
      'ntnyq/padding-line-between-statements': [
        'error',
        // The last matching entry wins; keep exceptions after broader rules.
        // Require a blank line before control flow statements, return, and throw.
        {
          blankLine: 'always',
          prev: '*',
          next: [
            'if',
            'for',
            'while',
            'do',
            'switch',
            'try',
            'return',
            'throw',
          ],
        },
        // Require a blank line after conditionals, loops, switch, and try statements.
        {
          blankLine: 'always',
          next: '*',
          prev: ['if', 'for', 'while', 'do', 'switch', 'try'],
        },
        // Separate variable declarations from the following statement.
        {
          blankLine: 'always',
          next: '*',
          prev: ['const', 'let', 'var'],
        },
        // Allow consecutive variable declarations with or without blank lines.
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },
        // Require a blank line before function and class declarations.
        {
          blankLine: 'always',
          next: ['function', 'class'],
          prev: '*',
        },
        // Require a blank line after function and class declarations.
        {
          blankLine: 'always',
          next: '*',
          prev: ['function', 'class'],
        },
        // Separate imports from the following statement.
        {
          blankLine: 'always',
          next: '*',
          prev: 'import',
        },
        // Disallow blank lines between consecutive imports.
        {
          blankLine: 'never',
          next: 'import',
          prev: 'import',
        },
      ],
      'ntnyq/prefer-newline-after-file-header': 'error',
      'ntnyq/prefer-object-method-syntax': [
        'error',
        {
          allowArrowFunctions: 'singleLineOnly',
          avoidQuotes: true,
          fix: true,
        },
      ],
      'ntnyq/return-object-multiline': 'error',

      // Overrides rules
      ...options.overrides,
    },
  },
]
