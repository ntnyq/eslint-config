import process from 'node:process'
import { GLOB_DTS, GLOB_TS, GLOB_TSX } from '../globs'
import { tseslint } from '../plugins'
import type { ConfigTypeScriptOptions, TypedConfigItem } from '../types'

export const typescriptCore = (options: ConfigTypeScriptOptions = {}) => {
  const isTypeAware = !!options.tsconfigPath

  const configs = tseslint.config({
    name: 'ntnyq/ts/core',
    extends: [...tseslint.configs.recommended],
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ...(isTypeAware
          ? {
              projectService: {
                defaultProject: options.tsconfigPath,
              },
              tsconfigRootDir: process.cwd(),
            }
          : {}),
      },
    },
    rules: {
      // Disabled in favor of ts rules
      'no-redeclare': 'off',
      'no-use-before-define': 'off',
      'no-unused-vars': 'off',

      '@typescript-eslint/no-redeclare': [
        'error',
        {
          builtinGlobals: false,
          ignoreDeclarationMerge: true,
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: false,
          variables: true,
          allowNamedExports: false,
          enums: true,
          typedefs: false,
          ignoreTypeReferences: false,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          // Args after the last used will be reported
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'always',
          allowObjectTypes: 'always',
        },
      ],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow-as-parameter',
        },
      ],
      '@typescript-eslint/prefer-as-const': 'warn',

      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',

      // Overrides rules
      ...options.overrides,
    },
  })
  return configs as TypedConfigItem[]
}

export const typescript = (options: ConfigTypeScriptOptions = {}): TypedConfigItem[] => [
  ...typescriptCore(options),

  {
    name: 'ntnyq/ts/types',
    files: [GLOB_DTS, '**/types/**/*.ts'],
    rules: {
      'no-use-before-define': 'off',
      'no-restricted-syntax': 'off',
      'import/no-duplicates': 'off',
      'import/newline-after-import': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
    },
  },
]
