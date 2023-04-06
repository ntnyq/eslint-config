import jsoncPlugin, { configs } from 'eslint-plugin-jsonc'
import jsoncParser from 'jsonc-eslint-parser'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from './shared.js'

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const jsonc = [
  {
    files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC, '**/*rc'],
    plugins: {
      jsonc: jsoncPlugin,
    },
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      ...configs['recommended-with-jsonc'].rules,
      'jsonc/array-bracket-spacing': ['error', 'never'],
      'jsonc/comma-dangle': ['error', 'never'],
      'jsonc/comma-style': ['error', 'last'],
      'jsonc/indent': ['error', 2],
      'jsonc/key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true,
        },
      ],
      'jsonc/no-octal-escape': 'error',
      'jsonc/object-curly-newline': [
        'error',
        {
          multiline: true,
          consistent: true,
        },
      ],
      'jsonc/object-curly-spacing': ['error', 'always'],
      'jsonc/object-property-newline': [
        'error',
        {
          allowMultiplePropertiesPerLine: true,
        },
      ],
    },
  },
]

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const pkgOrder = [
  {
    files: ['**/package.json'],
    rules: {
      'jsonc/sort-keys': [
        'error',
        {
          pathPattern: '^$',
          order: [
            'publisher',
            'name',
            'displayName',
            'type',
            'version',
            'private',
            'packageManager',
            'description',
            'keywords',
            'license',
            'author',
            'homepage',
            'repository',
            'funding',
            'exports',
            'main',
            'module',
            'unpkg',
            'jsdelivr',
            // workaround for `type: "module"` with TS `moduleResolution: "node16"`
            'types',
            'typesVersions',
            'bin',
            'icon',
            'files',
            'sideEffects',
            'scripts',
            'peerDependencies',
            'peerDependenciesMeta',
            'dependencies',
            'optionalDependencies',
            'devDependencies',
            'activationEvents',
            'contributes',
            'categories',
            'engines',
            'pnpm',
            'overrides',
            'resolutions',
            'husky',
            'prettier',
            'nano-staged',
            'lint-staged',
            'eslintConfig',
          ],
        },
        {
          pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
          order: { type: 'asc' },
        },
        {
          pathPattern: '^exports.*$',
          order: ['types', 'require', 'import'],
        },
        {
          pathPattern: '^scripts$',
          order: { type: 'asc' },
        },
      ],
    },
  },
]
