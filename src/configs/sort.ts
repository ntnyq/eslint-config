import type { ConfigSortOptions, TypedConfigItem } from '../types'

export const sort = (options: ConfigSortOptions = {}): TypedConfigItem[] => {
  const configs: TypedConfigItem[] = []
  const {
    tsconfig: enableSortTsconfig = true,
    packageJson: enableSortPackageJson = true,
    i18nLocale: enableSortI18nLocale = true,
    pnpmWorkspace: enableSortPnpmWorkspace = true,
  } = options

  if (enableSortTsconfig) {
    configs.push({
      name: 'ntnyq/sort/tsconfig',
      files: ['**/tsconfig.json', '**/tsconfig.*.json'],
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            order: ['extends', 'compilerOptions', 'references', 'files', 'include', 'exclude'],
            pathPattern: '^$',
          },
          {
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
            pathPattern: '^compilerOptions$',
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
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
            order: { type: 'asc' },
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
          },
          {
            pathPattern: '^exports.*$',
            order: ['types', 'import', 'require', 'default'],
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
            order: { type: 'asc' },
            pathPattern: '^publishConfig.*$',
          },
          // npm scripts
          {
            pathPattern: '^scripts$',
            order: { type: 'asc' },
          },
          {
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
            pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
          },
        ],
        'jsonc/sort-array-values': [
          'error',
          {
            pathPattern: '^files$',
            order: { type: 'asc' },
          },
          {
            pathPattern: '^keywords$',
            order: { type: 'asc' },
          },
          {
            pathPattern: '^activationEvents$',
            order: { type: 'asc' },
          },
          {
            pathPattern: '^contributes.*$',
            order: { type: 'asc' },
          },
        ],
      },
    })
  }

  if (enableSortI18nLocale) {
    configs.push(
      {
        name: 'ntnyq/sort/i18n-locale/json',
        files: ['**/{locales,i18n}/*.json'],
        rules: {
          'jsonc/sort-keys': [
            'error',
            {
              pathPattern: '.*',
              order: { type: 'asc' },
            },
          ],
        },
      },
      {
        name: 'ntnyq/sort/i18n-locale/yaml',
        files: ['**/{locales,i18n}/*.y?(a)ml'],
        rules: {
          'yml/sort-keys': [
            'error',
            {
              pathPattern: '.*',
              order: { type: 'asc' },
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
            pathPattern: '.*',
            order: { type: 'asc' },
          },
        ],
      },
    })
  }

  return configs
}
