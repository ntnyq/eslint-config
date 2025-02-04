import process from 'node:process'
import { configsTypescript, parserTypeScript, pluginAntfu, pluginTypeScript } from '../eslint'
import { GLOB_ASTRO, GLOB_MARKDOWN, GLOB_TS, GLOB_TSX, GLOB_TYPES } from '../globs'
import type {
  ConfigTypeScriptOptions,
  ESLintParser,
  TSESLintParserOptions,
  TypedConfigItem,
} from '../types'

/**
 * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-type-checked.ts}
 */
const typeAwareRules: TypedConfigItem['rules'] = {
  'dot-notation': 'off',
  'require-await': 'off',
  'no-implied-eval': 'off',
  'no-throw-literal': 'off',

  // too strict
  '@typescript-eslint/strict-boolean-expressions': 'off',

  '@typescript-eslint/require-await': 'error',
  '@typescript-eslint/unbound-method': 'error',
  '@typescript-eslint/no-unsafe-call': 'error',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/no-for-in-array': 'error',
  '@typescript-eslint/no-implied-eval': 'error',
  '@typescript-eslint/only-throw-error': 'error',
  '@typescript-eslint/no-unsafe-return': 'error',
  '@typescript-eslint/no-misused-spread': 'error',
  '@typescript-eslint/no-unsafe-argument': 'error',
  '@typescript-eslint/no-misused-promises': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'error',
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/promise-function-async': 'error',
  '@typescript-eslint/restrict-plus-operands': 'error',
  '@typescript-eslint/triple-slash-reference': 'error',
  '@typescript-eslint/no-unsafe-member-access': 'error',
  '@typescript-eslint/switch-exhaustiveness-check': 'error',
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  '@typescript-eslint/restrict-template-expressions': 'error',
  '@typescript-eslint/no-redundant-type-constituents': 'error',
  '@typescript-eslint/no-duplicate-type-constituents': 'error',
  '@typescript-eslint/return-await': ['error', 'in-try-catch'],
  '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
}

/**
 * typescript-eslint recommended rules
 */
const recommendedRules: TypedConfigItem['rules'] = configsTypescript.recommended.reduce<
  TypedConfigItem['rules']
>((rules, config) => {
  return { ...rules, ...(config.rules || {}) }
}, {})

export const configTypeScript = (options: ConfigTypeScriptOptions = {}): TypedConfigItem[] => {
  /**
   * @see {@link https://typescript-eslint.io/troubleshooting/typed-linting}
   */
  const enableTypeAwareLint = !!options?.tsconfigPath
  const {
    extensions = [],
    filesTypeAware = [GLOB_TS, GLOB_TSX],
    ignoresTypeAware = [GLOB_ASTRO, `${GLOB_MARKDOWN}/**`],
    overridesTypeAwareRules = {},
    parserOptions = {},
  } = options

  const files = options.files ?? [
    GLOB_TS,
    GLOB_TSX,
    // Enable typescript in these exts
    ...extensions.map(ext => `**/*.${ext}`),
  ]

  function createParserConfig(
    enableTypeAware = false,
    files: string[] = [],
    ignores: string[] = [],
  ) {
    const typescriptParserOptions: TSESLintParserOptions = {
      extraFileExtensions: extensions.map(ext => `.${ext}`),
      sourceType: 'module',
      ...(enableTypeAware
        ? {
            projectService: {
              allowDefaultProject: ['./*.js'],
              defaultProject: options.tsconfigPath,
            },
            tsconfigRootDir: process.cwd(),
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

        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'off',

        '@typescript-eslint/prefer-as-const': 'warn',

        // Disabled in favor of enhanced ts rules
        'no-redeclare': 'off',
        'no-unused-vars': 'off',
        'default-param-last': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',

        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/no-useless-constructor': 'error',
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

        // Extra rules
        '@typescript-eslint/ban-tslint-comment': 'error',
        '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
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
        'no-use-before-define': 'off',
        'no-restricted-syntax': 'off',
        'import-x/no-duplicates': 'off',
        'import-x/newline-after-import': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
      },
    },
  ]
}
