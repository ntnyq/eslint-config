import process from 'node:process'
import {
  configsTypeScript,
  parserTypeScript,
  pluginAntfu,
  pluginTypeScript,
} from '../eslint'
import {
  GLOB_ASTRO,
  GLOB_MARKDOWN,
  GLOB_TS,
  GLOB_TSX,
  GLOB_TYPES,
} from '../globs'
import type {
  ESLintConfig,
  ESLintParser,
  OptionsFiles,
  OptionsOverrides,
  OptionsShareable,
  TSESLintParserOptions,
  TypedConfigItem,
} from '../types'

/**
 * Options type of {@link configTypeScript}
 */
export type ConfigTypeScriptOptions = OptionsFiles
  & OptionsOverrides
  & Pick<OptionsShareable, 'extraFileExtensions' | 'ecmaVersion'> & {
    /**
     * Glob patterns for files that should be type aware.
     * @default ['**\/*.{ts,tsx}']
     */
    filesTypeAware?: string[]

    /**
     * Glob patterns for files that should not be type aware.
     * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
     */
    ignoresTypeAware?: string[]

    /**
     * Overrides built-in type aware rules
     */
    overridesTypeAwareRules?: TypedConfigItem['rules']

    /**
     * Additional parser options
     */
    parserOptions?: TSESLintParserOptions

    /**
     * Enable type aware check for TypeScript files
     */
    tsconfigPath?: string

    /**
     * Globs of files to run with default project compiler
     */
    allowDefaultProject?: string[]
  }

/**
 * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-type-checked.ts}
 */
const typeAwareRules: TypedConfigItem['rules'] = {
  // too strict
  '@typescript-eslint/strict-boolean-expressions': 'off',
  'dot-notation': 'off',
  'no-implied-eval': 'off',
  'no-throw-literal': 'off',
  'require-await': 'off',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      disallowTypeAnnotations: false,
      fixStyle: 'separate-type-imports',
      prefer: 'type-imports',
    },
  ],
  '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
  '@typescript-eslint/no-duplicate-type-constituents': 'error',
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-for-in-array': 'error',
  '@typescript-eslint/no-implied-eval': 'error',
  '@typescript-eslint/no-misused-promises': 'error',
  '@typescript-eslint/no-misused-spread': 'error',
  '@typescript-eslint/no-redundant-type-constituents': 'error',
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  '@typescript-eslint/no-unsafe-argument': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'error',
  '@typescript-eslint/no-unsafe-call': 'error',
  '@typescript-eslint/no-unsafe-member-access': 'error',
  '@typescript-eslint/no-unsafe-return': 'error',
  '@typescript-eslint/only-throw-error': 'error',
  '@typescript-eslint/promise-function-async': 'error',
  '@typescript-eslint/require-await': 'error',
  '@typescript-eslint/restrict-plus-operands': 'error',
  '@typescript-eslint/restrict-template-expressions': 'error',
  '@typescript-eslint/return-await': ['error', 'in-try-catch'],
  '@typescript-eslint/switch-exhaustiveness-check': 'error',
  '@typescript-eslint/triple-slash-reference': 'error',
  '@typescript-eslint/unbound-method': 'error',
}

/**
 * typescript-eslint recommended rules
 */
const recommendedRules: TypedConfigItem['rules'] =
  configsTypeScript.recommended.reduce<TypedConfigItem['rules']>(
    (rules, config) => {
      return { ...rules, ...(config.rules || {}) }
    },
    {},
  )

/**
 * Config for TypeScript files
 *
 * @see {@link https://github.com/typescript-eslint/typescript-eslint}
 *
 * @param options - {@link ConfigTypeScriptOptions}
 * @returns ESLint configs
 */
export const configTypeScript = (
  options: ConfigTypeScriptOptions = {},
): TypedConfigItem[] => {
  /**
   * @see {@link https://typescript-eslint.io/troubleshooting/typed-linting}
   */
  const enableTypeAwareLint = !!options?.tsconfigPath
  const {
    allowDefaultProject = [],
    ecmaVersion = 'latest',
    extraFileExtensions = [],
    filesTypeAware = [GLOB_TS, GLOB_TSX],
    ignoresTypeAware = [GLOB_ASTRO, `${GLOB_MARKDOWN}/**`],
    overridesTypeAwareRules = {},
    parserOptions = {},
  } = options

  const files = options.files ?? [
    GLOB_TS,
    GLOB_TSX,
    // Enable typescript in these files
    ...extraFileExtensions.map(ext => `**/*${ext}`),
  ]

  function createParserConfig(
    enableTypeAware = false,
    files: ESLintConfig['files'] = [],
    ignores: string[] = [],
  ) {
    const typescriptParserOptions: TSESLintParserOptions = {
      ecmaVersion,
      extraFileExtensions,
      sourceType: 'module',
      ...(enableTypeAware
        ? {
            tsconfigRootDir: process.cwd(),
            projectService: {
              allowDefaultProject: ['./*.js', ...allowDefaultProject],
              defaultProject: options.tsconfigPath,
            },
          }
        : {}),
      ...parserOptions,
    }
    const parserConfig: TypedConfigItem = {
      name: `ntnyq/ts/${enableTypeAware ? 'parser-type-aware' : 'parser'}`,
      files,
      ignores: [...ignores],
      languageOptions: {
        parser: parserTypeScript as ESLintParser,
        parserOptions: typescriptParserOptions,
      },
    }
    return parserConfig
  }

  return [
    {
      name: 'ntnyq/ts/setup',
      plugins: {
        '@typescript-eslint': pluginTypeScript,
        antfu: pluginAntfu,
      },
    },

    ...(enableTypeAwareLint
      ? [
          createParserConfig(false, files),
          createParserConfig(true, filesTypeAware, ignoresTypeAware),
        ]
      : [createParserConfig(false, files)]),

    {
      name: 'ntnyq/ts/rules',
      files,
      rules: {
        ...recommendedRules,

        '@typescript-eslint/consistent-indexed-object-style': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
        'default-param-last': 'off',
        // Disabled in favor of enhanced ts rules
        'no-redeclare': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        '@typescript-eslint/prefer-as-const': 'warn',
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            minimumDescriptionLength: 1,
            'ts-check': false,
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
          },
        ],
        // Extra rules
        '@typescript-eslint/ban-tslint-comment': 'error',
        '@typescript-eslint/consistent-generic-constructors': [
          'error',
          'constructor',
        ],
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow-as-parameter',
          },
        ],
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/no-empty-object-type': [
          'error',
          {
            allowInterfaces: 'always',
            allowObjectTypes: 'always',
          },
        ],
        '@typescript-eslint/no-redeclare': [
          'error',
          {
            builtinGlobals: false,
            ignoreDeclarationMerge: true,
          },
        ],
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
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
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            allowNamedExports: false,
            classes: false,
            enums: true,
            functions: false,
            ignoreTypeReferences: false,
            typedefs: false,
            variables: true,
          },
        ],
        '@typescript-eslint/no-useless-constructor': 'error',

        // Overrides rules
        ...options.overrides,
      },
    },

    ...(enableTypeAwareLint
      ? ([
          {
            name: 'ntnyq/ts/rules/type-aware',
            files: [...filesTypeAware],
            ignores: [...ignoresTypeAware],
            rules: {
              ...typeAwareRules,

              // Overrides type aware rules
              ...overridesTypeAwareRules,
            },
          },
        ] satisfies TypedConfigItem[])
      : []),

    {
      name: 'ntnyq/ts/types',
      files: [...GLOB_TYPES],
      rules: {
        '@typescript-eslint/no-use-before-define': 'off',
        'import-x/newline-after-import': 'off',
        'import-x/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'no-use-before-define': 'off',
        // `var` is special for type extend
        // e.g: extend globalThis
        'no-var': 'off',
        'vars-on-top': 'off',
      },
    },
  ]
}
