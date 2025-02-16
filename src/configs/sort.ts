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
    packageJson: enableSortPackageJson = true,
    pnpmWorkspace: enableSortPnpmWorkspace = true,
    tsconfig: enableSortTsconfig = true,
  } = options

  if (enableSortTsconfig) {
    configs.push({
      name: 'ntnyq/sort/tsconfig',
      files: ['**/tsconfig.json', '**/tsconfig.*.json'],
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
            ],
          },
        ],
      },
    })
  }

  if (enableSortPackageJson) {
    configs.push({
      name: 'ntnyq/sort/package-json',
      files: ['**/package.json'],
      rules: {
        'jsonc/sort-array-values': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '^files$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^keywords$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^activationEvents$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^contributes.*$',
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

  if (enableSortPnpmWorkspace) {
    configs.push({
      name: 'ntnyq/sort/pnpm-workspace',
      files: ['**/pnpm-workspace.yaml'],
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

  if (additionalJsonFiles.length) {
    configs.push({
      name: 'ntnyq/sort/additional-json',
      files: additionalJsonFiles,
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '.*',
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
