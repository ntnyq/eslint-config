import {
  GLOB_JSON_SCHEMA,
  GLOB_PACKAGE_JSON,
  GLOB_PNPM_WORKSPACE_YAML,
  GLOB_TSCONFIG_JSON,
} from '../globs'
import type { TypedConfigItem } from '../types'

/**
 * Options type of {@link configSort}
 */
export interface ConfigSortOptions {
  /**
   * JSON files to sort all properties alphabeta
   */
  additionalJsonFiles?: string[]

  /**
   * YAML files to sort all properties alphabeta
   */
  additionalYamlFiles?: string[]

  /**
   * @default true
   */
  i18nLocale?: boolean

  /**
   * @default true
   */
  packageJson?: boolean

  /**
   * @default true
   */
  pnpmWorkspace?: boolean

  /**
   * @default true
   */
  tsconfig?: boolean

  /**
   * @default true
   */
  jsonSchema?: boolean
}

/**
 * Config for sort keys and values
 *
 * @param options - {@link ConfigSortOptions}
 * @returns ESLint configs
 */
export const configSort = (
  options: ConfigSortOptions = {},
): TypedConfigItem[] => {
  const configs: TypedConfigItem[] = []
  const {
    additionalJsonFiles = [],
    additionalYamlFiles = [],
    i18nLocale: enableSortI18nLocale = true,
    jsonSchema: enableSortJsonSchema = true,
    packageJson: enableSortPackageJson = true,
    pnpmWorkspace: enableSortPnpmWorkspace = true,
    tsconfig: enableSortTsconfig = true,
  } = options

  if (enableSortTsconfig) {
    configs.push({
      name: 'ntnyq/sort/tsconfig',
      files: [...GLOB_TSCONFIG_JSON],
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'extends',
              'compilerOptions',
              'references',
              'files',
              'include',
              'exclude',
              // vue.volar
              'vueCompilerOptions',
              // Unknown fields
              {
                order: {
                  type: 'asc',
                },
              },
            ],
          },
          {
            pathPattern: '^compilerOptions$',
            order: [
              /* Projects */
              'incremental',
              'composite',
              'tsBuildInfoFile',
              'disableSourceOfProjectReferenceRedirect',
              'disableSolutionSearching',
              'disableReferencedProjectLoad',
              /* Language and Environment */
              'target',
              'lib',
              'jsx',
              'experimentalDecorators',
              'emitDecoratorMetadata',
              'jsxFactory',
              'jsxFragmentFactory',
              'jsxImportSource',
              'reactNamespace',
              'noLib',
              'useDefineForClassFields',
              'moduleDetection',
              /* Modules */
              'module',
              'rootDir',
              'moduleResolution',
              'baseUrl',
              'paths',
              'rootDirs',
              'typeRoots',
              'types',
              'allowUmdGlobalAccess',
              'moduleSuffixes',
              'allowImportingTsExtensions',
              'resolvePackageJsonExports',
              'resolvePackageJsonImports',
              'customConditions',
              'resolveJsonModule',
              'allowArbitraryExtensions',
              'noResolve',
              'erasableSyntaxOnly',
              'libReplacement',
              /* JavaScript Support */
              'allowJs',
              'checkJs',
              'maxNodeModuleJsDepth',
              /* Emit */
              'declaration',
              'declarationMap',
              'emitDeclarationOnly',
              'sourceMap',
              'inlineSourceMap',
              'outFile',
              'outDir',
              'removeComments',
              'noEmit',
              'importHelpers',
              'importsNotUsedAsValues',
              'downlevelIteration',
              'sourceRoot',
              'mapRoot',
              'inlineSources',
              'emitBOM',
              'newLine',
              'stripInternal',
              'noEmitHelpers',
              'noEmitOnError',
              'preserveConstEnums',
              'declarationDir',
              'preserveValueImports',
              /* Interop Constraints */
              'isolatedDeclarations',
              'isolatedModules',
              'verbatimModuleSyntax',
              'allowSyntheticDefaultImports',
              'esModuleInterop',
              'preserveSymlinks',
              'forceConsistentCasingInFileNames',
              /* Type Checking */
              'strict',
              'strictBindCallApply',
              'strictFunctionTypes',
              'strictNullChecks',
              'strictPropertyInitialization',
              'allowUnreachableCode',
              'allowUnusedLabels',
              'alwaysStrict',
              'exactOptionalPropertyTypes',
              'noFallthroughCasesInSwitch',
              'noImplicitAny',
              'noImplicitOverride',
              'noImplicitReturns',
              'noImplicitThis',
              'noPropertyAccessFromIndexSignature',
              'noUncheckedIndexedAccess',
              'noUnusedLocals',
              'noUnusedParameters',
              'useUnknownInCatchVariables',
              /* Completeness */
              'skipDefaultLibCheck',
              'skipLibCheck',

              // Unknown fields
              {
                order: {
                  type: 'asc',
                },
              },
            ],
          },
          {
            order: { type: 'asc' },
            pathPattern: '^vueCompilerOptions$',
          },
        ],
      },
    })
  }

  if (enableSortPackageJson) {
    configs.push({
      name: 'ntnyq/sort/package-json',
      files: [GLOB_PACKAGE_JSON],
      rules: {
        'jsonc/sort-array-values': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '^(?:files|keywords|activationEvents|contributes.*)$',
          },
        ],
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              /**
               * Meta
               */
              'publisher',
              'name',
              'displayName',
              'preview',
              'type',
              'config',
              'version',
              'private',
              'packageManager',
              'workspaces',
              'description',
              'keywords',
              'license',
              'licenses',
              'author',
              'contributors',
              'maintainers',
              'homepage',
              'repository',
              'bugs',
              'funding',

              /**
               * Publish
               */
              'exports',
              'imports',
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
              'directories',
              'publishConfig',

              /**
               * Misc
               */
              'sideEffects',
              'scripts',

              /**
               * Dependencies
               */
              'peerDependencies',
              'peerDependenciesMeta',
              'bundledDependencies',
              'bundleDependencies',
              'dependencies',
              'optionalDependencies',
              'devDependencies',

              /**
               * VSCode extension
               */
              'activationEvents',
              'contributes',
              'categories',
              'galleryBanner',
              'badges',
              'markdown',
              'qna',
              'sponsor',
              'extensionPack',
              'extensionDependencies',
              'extensionKind',
              'pricing',
              'capabilities',

              /**
               * Package manager
               */
              'engines',
              'pnpm',
              'overrides',
              'resolutions',

              /**
               * Third party
               */
              'husky',
              'prettier',
              'nano-staged',
              'lint-staged',
              'eslintConfig',

              // Unknown fields
              {
                order: {
                  type: 'asc',
                },
              },
            ],
          },
          {
            order: { type: 'asc' },
            pathPattern:
              '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
          },
          {
            pathPattern: '^exports.*$',
            order: [
              './package.json',
              'types',
              'import',
              'require',
              'default',
              // Unknown fields
              {
                order: {
                  type: 'asc',
                },
              },
            ],
          },
          // VSCode extension
          {
            order: { type: 'asc' },
            pathPattern: '^contributes.*$',
          },
          /**
           * pnpm publish config
           * @see {@link https://pnpm.io/package_json#publishconfig}
           */
          {
            pathPattern: '^publishConfig.*$',
            order: [
              './package.json',
              'types',
              'import',
              'require',
              'default',
              // Unknown fields
              {
                order: {
                  type: 'asc',
                },
              },
            ],
          },
          // npm scripts
          {
            order: { type: 'asc' },
            pathPattern: '^scripts$',
          },
          {
            pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
            order: [
              // client hooks only
              'pre-commit',
              'prepare-commit-msg',
              'commit-msg',
              'post-commit',
              'pre-rebase',
              'post-rewrite',
              'post-checkout',
              'post-merge',
              'pre-push',
              'pre-auto-gc',
              // Unknown fields
              {
                order: {
                  type: 'asc',
                },
              },
            ],
          },
        ],
      },
    })
  }

  if (enableSortI18nLocale) {
    configs.push(
      {
        name: 'ntnyq/sort/i18n-locale/json',
        files: ['**/{i18n,langs,locales}/*.json'],
        rules: {
          'jsonc/sort-keys': [
            'error',
            {
              order: { type: 'asc' },
              pathPattern: '.*',
            },
          ],
        },
      },
      {
        name: 'ntnyq/sort/i18n-locale/yaml',
        files: ['**/{i18n,langs,locales}/*.y?(a)ml'],
        rules: {
          'yml/sort-keys': [
            'error',
            {
              order: { type: 'asc' },
              pathPattern: '.*',
            },
          ],
        },
      },
    )
  }

  /**
   * @see {@link https://json-schema.org/draft-07/schema}
   */
  if (enableSortJsonSchema) {
    configs.push({
      name: 'ntnyq/sort/json-schema',
      files: [...GLOB_JSON_SCHEMA],
      ignores: [GLOB_PACKAGE_JSON],
      rules: {
        'jsonc/sort-array-values': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '^(?:required)$',
          },
        ],
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              // Meta
              '$schema',
              '$comment',
              '$id',
              '$ref',
              'title',
              'description',
              'version',
              'type',

              'definitions',
              'properties',
              'required',
              'additionalProperties',
              // Unknown fields
              {
                order: {
                  type: 'asc',
                },
              },
            ],
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:definitions|properties)$',
          },
        ],
      },
    })
  }

  if (enableSortPnpmWorkspace) {
    configs.push({
      name: 'ntnyq/sort/pnpm-workspace',
      files: [GLOB_PNPM_WORKSPACE_YAML],
      rules: {
        'yml/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              // legacy workspace content
              'packages',
              'catalog',
              'catalogs',

              // pnpm settings with common used fields first
              'allowedDeprecatedVersions',
              'overrides',
              'onlyBuiltDependencies',
              'patchedDependencies',
              'peerDependencyRules',

              // non common used fields
              'allowNonAppliedPatches',
              'auditConfig',
              'configDependencies',
              'executionEnv',
              'ignoredBuiltDependencies',
              'ignoredOptionalDependencies',
              'neverBuiltDependencies',
              'onlyBuiltDependenciesFile',
              'packageExtensions',
              'requiredScripts',
              'supportedArchitectures',
              'updateConfig',
              // Unknown fields
              {
                order: {
                  type: 'asc',
                },
              },
            ],
          },
          {
            order: { type: 'asc' },
            pathPattern:
              '^(?:catalog|overrides|patchedDependencies|peerDependencyRules)$',
          },
          {
            allowLineSeparatedGroups: true,
            order: { type: 'asc' },
            pathPattern: '^catalogs$',
          },
        ],
        'yml/sort-sequence-values': [
          'error',
          {
            order: [
              '.',
              // Unknown fields
              {
                order: {
                  type: 'asc',
                },
              },
            ],
            pathPattern:
              '^(?:packages|onlyBuiltDependencies|peerDependencyRules.ignoreMissing)$',
          },
        ],
      },
    })
  }

  if (additionalJsonFiles.length) {
    configs.push({
      name: 'ntnyq/sort/additional-json',
      files: additionalJsonFiles,
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '.*',
            order: [
              '$schema',
              {
                order: { type: 'asc' },
              },
            ],
          },
        ],
      },
    })
  }

  if (additionalYamlFiles.length) {
    configs.push({
      name: 'ntnyq/sort/additional-yaml',
      files: additionalYamlFiles,
      rules: {
        'yml/sort-keys': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '.*',
          },
        ],
      },
    })
  }

  return configs
}
