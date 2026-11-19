import process from 'node:process'
import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineESLintConfig } from '../src'

const stdoutIsTTY = Object.getOwnPropertyDescriptor(process.stdout, 'isTTY')
const originalEnv: Partial<NodeJS.ProcessEnv> = {
  CI: process.env.CI,
  GIT_PARAMS: process.env.GIT_PARAMS,
  VSCODE_GIT_COMMAND: process.env.VSCODE_GIT_COMMAND,
  npm_lifecycle_script: process.env.npm_lifecycle_script,
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.resetModules()
  vi.doUnmock('@clack/prompts')
  vi.doUnmock('@antfu/install-pkg')
  vi.doUnmock('local-pkg')

  if (stdoutIsTTY) {
    Object.defineProperty(process.stdout, 'isTTY', stdoutIsTTY)
  }

  process.env.CI = originalEnv.CI
  process.env.GIT_PARAMS = originalEnv.GIT_PARAMS
  process.env.VSCODE_GIT_COMMAND = originalEnv.VSCODE_GIT_COMMAND
  process.env.npm_lifecycle_script = originalEnv.npm_lifecycle_script
})

function enableInteractiveInstallFlow() {
  Object.defineProperty(process.stdout, 'isTTY', {
    configurable: true,
    value: true,
  })

  delete process.env.CI
  delete process.env.GIT_PARAMS
  delete process.env.VSCODE_GIT_COMMAND
  process.env.npm_lifecycle_script = 'vitest --run'
}

function createDeferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason: Error) => void
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise
    reject = rejectPromise
  })

  return {
    promise,
    resolve,
    reject,
  }
}

describe('composer', () => {
  it('should return composer instance', () => {
    const config = defineESLintConfig()

    expect(config).toBeInstanceOf(FlatConfigComposer)
  })

  const COMPOSER_METHODS = [
    'clone',
    'remove',
    'append',
    'prepend',
    'replace',
    'override',
    'overrideRules',
    'renamePlugins',
  ] as const

  it.each(COMPOSER_METHODS)('should have method %s', method => {
    const config = defineESLintConfig()

    expect(typeof config[method]).toBe('function')
  })

  it('should not mutate shareable extraFileExtensions', async () => {
    const extraFileExtensions = ['.mdx']
    const options = {
      astro: true,
      shareable: {
        extraFileExtensions,
      },
      svelte: true,
      vue: true,
    }

    await defineESLintConfig(options)
    await defineESLintConfig(options)

    expect(extraFileExtensions).toEqual(['.mdx'])
    expect(options.shareable.extraFileExtensions).toEqual(['.mdx'])
  })

  it('should honor the shareable TypeScript setting', async () => {
    const disabledConfigs = await defineESLintConfig({
      shareable: {
        typescript: false,
      },
    })
    const enabledConfigs = await defineESLintConfig({
      shareable: {
        typescript: false,
      },
      typescript: true,
    })

    expect(
      disabledConfigs.some(item => item.name === 'ntnyq/typescript/setup'),
    ).toBe(false)
    expect(
      enabledConfigs.some(item => item.name === 'ntnyq/typescript/setup'),
    ).toBe(true)
  })

  it('should forward module options and merge shared and local file extensions', async () => {
    const githubActionFiles = ['ci/*.yaml']
    const configs = await defineESLintConfig({
      astro: { extraFileExtensions: ['.custom-astro'] },
      githubAction: { files: githubActionFiles },
      markdown: { extraFileExtensions: ['.custom-md'] },
      shareable: { extraFileExtensions: ['.mdx', '.vue'] },
      svelte: { extraFileExtensions: ['.custom-svelte'] },
      typescript: { extraFileExtensions: ['.custom-ts', '.mdx'] },
      unocss: { attributify: true },
      vue: { extraFileExtensions: ['.custom-vue'] },
    })

    expect(
      configs.find(config => config.name === 'ntnyq/unocss')?.rules,
    ).toMatchObject({
      'unocss/order-attributify': 'error',
    })
    expect(
      configs.find(config => config.name === 'ntnyq/github-action')?.files,
    ).toEqual(githubActionFiles)

    const sharedExtensions = ['.mdx', '.vue', '.astro', '.svelte']

    for (const [name, extension] of [
      ['ntnyq/typescript/parser', '.custom-ts'],
      ['ntnyq/vue/rules', '.custom-vue'],
      ['ntnyq/astro', '.custom-astro'],
      ['ntnyq/svelte', '.custom-svelte'],
    ]) {
      const config = configs.find(item => item.name === name)

      expect(config?.languageOptions?.parserOptions).toMatchObject({
        extraFileExtensions: [...sharedExtensions, extension],
      })
    }

    const markdown = configs.find(
      config => config.name === 'ntnyq/markdown/code-blocks',
    )

    expect(markdown?.files?.slice(1)).toEqual(
      [...sharedExtensions, '.custom-md'].map(
        extension => `**/*.md/**/*${extension}`,
      ),
    )
  })

  it('should forward shareable parser options to framework configs', async () => {
    const disabledConfigs = await defineESLintConfig({
      astro: true,
      oxfmt: false,
      prettier: false,
      shareable: {
        ecmaVersion: 2020,
        typescript: false,
      },
      svelte: true,
      vue: true,
    })
    const enabledConfigs = await defineESLintConfig({
      astro: {
        typescript: true,
      },
      oxfmt: false,
      prettier: false,
      shareable: {
        ecmaVersion: 2020,
        typescript: false,
      },
      svelte: {
        typescript: true,
      },
      vue: {
        typescript: true,
      },
    })

    for (const name of ['ntnyq/astro', 'ntnyq/svelte', 'ntnyq/vue/rules']) {
      const disabledConfig = disabledConfigs.find(item => item.name === name)
      const disabledParserOptions =
        disabledConfig?.languageOptions?.parserOptions
      const enabledConfig = enabledConfigs.find(item => item.name === name)
      const enabledParserOptions = enabledConfig?.languageOptions?.parserOptions

      expect(disabledParserOptions).toMatchObject({
        ecmaVersion: 2020,
      })
      expect(disabledParserOptions).not.toHaveProperty('parser')
      expect(enabledParserOptions).toHaveProperty('parser')
    }
  })

  it('should apply oxfmt ignores to the parser and formatter configs', async () => {
    const ignoredFile = '**/vendor/**'
    const configs = await defineESLintConfig({
      oxfmt: {
        ignores: [ignoredFile],
      },
      prettier: false,
    })
    const oxfmtConfigs = configs.filter(item =>
      item.name?.startsWith('ntnyq/oxfmt/'),
    )

    expect(oxfmtConfigs.map(config => config.name)).toEqual([
      'ntnyq/oxfmt/plain-parser',
      'ntnyq/oxfmt/native-files',
      'ntnyq/oxfmt/plain-parser-files',
    ])

    for (const config of oxfmtConfigs) {
      expect(config.ignores).toContain(ignoredFile)
    }
  })

  it('should include optional plugins and both formatters in the Inspector preset', async () => {
    const { default: inspectorConfig } =
      await import('../eslint-inspector.config')
    const configs = await inspectorConfig

    for (const [name, plugin] of [
      ['ntnyq/pinia', 'pinia'],
      ['ntnyq/shell', 'shell'],
      ['ntnyq/unused-imports', 'unused-imports'],
      ['ntnyq/oxfmt/native-files', 'oxfmt'],
      ['ntnyq/prettier', 'prettier'],
    ]) {
      expect(
        configs.find(config => config.name === name)?.plugins,
      ).toHaveProperty(plugin)
    }
  })

  it('should not mutate gitignore options', async () => {
    const gitignore = Object.freeze({})

    await expect(
      defineESLintConfig({
        gitignore,
      }),
    ).resolves.toBeDefined()
    expect(gitignore).toEqual({})
  })

  it('should enable the curated unicorn rules', async () => {
    const configs = await defineESLintConfig()
    const config = configs.find(item => item.name === 'ntnyq/unicorn')

    expect(config?.rules).toMatchObject({
      'unicorn/no-accidental-bitwise-operator': 'error',
      'unicorn/no-async-iterator-callback': 'error',
      'unicorn/no-boolean-sort-comparator': 'error',
      'unicorn/no-chained-comparison': 'error',
      'unicorn/no-duplicate-logical-operands': 'error',
      'unicorn/no-multiple-promise-resolver-calls': 'error',
      'unicorn/no-transition-all': 'error',
      'unicorn/no-unnecessary-string-trim': 'error',
      'unicorn/no-unused-builtin-method-return': 'error',
      'unicorn/no-unused-iterator-helper': 'error',
      'unicorn/no-useless-re-export': 'error',
      'unicorn/no-useless-set-construction': 'error',
      'unicorn/no-using-resource-escape': 'error',
      'unicorn/prefer-combined-guards': 'error',
      'unicorn/prefer-temporal-conversion': 'error',
      'unicorn/prefer-then-catch': 'error',
    })
    expect(config?.rules).not.toHaveProperty(
      'unicorn/no-unused-array-method-return',
    )
  })

  it('should allow overriding curated unicorn rules', async () => {
    const configs = await defineESLintConfig({
      unicorn: {
        overrides: {
          'unicorn/no-unused-builtin-method-return': 'off',
          'unicorn/prefer-combined-guards': 'warn',
        },
      },
    })
    const config = configs.find(item => item.name === 'ntnyq/unicorn')

    expect(config?.rules).toMatchObject({
      'unicorn/no-unused-builtin-method-return': 'off',
      'unicorn/no-unused-iterator-helper': 'error',
      'unicorn/prefer-combined-guards': 'warn',
    })
  })

  it('should forward unicorn preset options', async () => {
    const configs = await defineESLintConfig({
      unicorn: {
        preset: 'recommended',
      },
    })
    const config = configs.find(
      item => item.name === 'ntnyq/unicorn/recommended',
    )

    expect(config?.rules).toMatchObject({
      'unicorn/no-multiple-promise-resolver-calls': 'error',
      'unicorn/prefer-then-catch': 'error',
    })
  })

  it('should resolve nested pnpm branches', async () => {
    const configs = await defineESLintConfig({
      pnpm: {
        json: {
          files: ['custom-package.json'],
          overrides: {
            'pnpm/json-valid-catalog': 'warn',
          },
        },
        yaml: false,
      },
    })
    const jsonConfig = configs.find(
      item => item.name === 'ntnyq/pnpm/package-json',
    )

    expect(jsonConfig).toMatchObject({
      files: ['custom-package.json'],
      rules: {
        'pnpm/json-valid-catalog': 'warn',
      },
    })
    expect(
      configs.some(item => item.name === 'ntnyq/pnpm/pnpm-workspace-yaml'),
    ).toBe(false)
  })

  it('should resolve nested test branches', async () => {
    const configs = await defineESLintConfig({
      test: {
        base: {
          overrides: {
            'no-console': 'off',
          },
        },
        files: ['**/*.check.ts'],
        vitest: {
          files: ['**/*.vitest.ts'],
          overrides: {
            'vitest/expect-expect': 'warn',
          },
        },
      },
    })
    const baseConfig = configs.find(item => item.name === 'ntnyq/test/base')
    const vitestConfig = configs.find(item => item.name === 'ntnyq/test/vitest')

    expect(baseConfig).toMatchObject({
      files: ['**/*.check.ts'],
      rules: {
        'no-console': 'off',
      },
    })
    expect(vitestConfig).toMatchObject({
      files: ['**/*.vitest.ts'],
      rules: {
        'vitest/expect-expect': 'warn',
      },
    })
  })

  it('should resolve nested perfectionist branches', async () => {
    const configs = await defineESLintConfig({
      perfectionist: {
        common: {
          overrides: {
            'perfectionist/sort-imports': 'off',
          },
        },
        constants: false,
        enums: {
          files: ['**/*.enum.ts'],
          overrides: {
            'perfectionist/sort-modules': 'warn',
          },
        },
        types: false,
      },
    })
    const commonConfig = configs.find(
      item => item.name === 'ntnyq/perfectionist/common',
    )
    const enumsConfig = configs.find(
      item => item.name === 'ntnyq/perfectionist/enums',
    )

    expect(commonConfig?.rules?.['perfectionist/sort-imports']).toBe('off')
    expect(enumsConfig).toMatchObject({
      files: ['**/*.enum.ts'],
      rules: {
        'perfectionist/sort-modules': 'warn',
      },
    })
    expect(
      configs.some(item => item.name === 'ntnyq/perfectionist/constants'),
    ).toBe(false)
    expect(
      configs.some(item => item.name === 'ntnyq/perfectionist/types'),
    ).toBe(false)
  })

  it('should resolve nested specials branches', async () => {
    const configs = await defineESLintConfig({
      specials: {
        additionalConfigs: [{ name: 'custom/special' }],
        bin: false,
        cli: false,
        configFiles: false,
        scripts: {
          files: ['**/*.script.ts'],
          overrides: {
            'no-console': 'error',
          },
        },
        shadcnVue: false,
        userScripts: false,
      },
    })
    const specialsConfigs = configs.filter(item =>
      item.name?.startsWith('ntnyq/specials/'),
    )

    expect(specialsConfigs).toHaveLength(1)
    expect(specialsConfigs[0]).toMatchObject({
      files: ['**/*.script.ts'],
      name: 'ntnyq/specials/scripts',
      rules: {
        'no-console': 'error',
      },
    })
    expect(configs.some(item => item.name === 'custom/special')).toBe(true)
  })
})

describe('ensurePackages', () => {
  it('should serialize optional installs from the factory and continue after failure or cancellation', async () => {
    enableInteractiveInstallFlow()

    const missingPackages = new Set([
      'astro-eslint-parser',
      'svelte-eslint-parser',
      'eslint-plugin-svelte',
      '@html-eslint/parser',
    ])
    const canceled = Symbol('cancel')
    const firstConfirmation = createDeferred<boolean>()
    const firstInstallation = createDeferred<void>()
    const confirm = vi
      .fn<(options: { message: string }) => Promise<boolean | symbol>>()
      .mockReturnValueOnce(firstConfirmation.promise)
      .mockResolvedValueOnce(canceled)
      .mockResolvedValue(true)
    const installPackage = vi
      .fn<(packages: string[], options: { dev: boolean }) => Promise<void>>()
      .mockReturnValueOnce(firstInstallation.promise)
      .mockResolvedValue(undefined)

    vi.doMock(import('local-pkg'), async importOriginal => {
      const actual = await importOriginal()

      return {
        ...actual,
        isPackageExists(...args: Parameters<typeof actual.isPackageExists>) {
          return (
            !missingPackages.has(args[0]) && actual.isPackageExists(...args)
          )
        },
      }
    })
    vi.doMock('@clack/prompts', () => ({
      confirm,
      isCancel: (value: unknown) => value === canceled,
    }))
    vi.doMock('@antfu/install-pkg', () => ({
      installPackage,
    }))

    const { defineESLintConfig } = await import('../src')
    const result = Promise.resolve(
      defineESLintConfig({ astro: true, html: true, svelte: true }),
    ).catch((error: unknown) => error)

    try {
      await vi.dynamicImportSettled()
      expect(confirm).toHaveBeenCalledOnce()

      firstConfirmation.resolve(true)
      await vi.dynamicImportSettled()
      expect(installPackage).toHaveBeenCalledExactlyOnceWith(
        ['astro-eslint-parser'],
        { dev: true },
      )
      expect(confirm).toHaveBeenCalledOnce()

      missingPackages.delete('svelte-eslint-parser')
      firstInstallation.reject(new Error('install failed'))

      await expect(result).resolves.toMatchObject({
        message: 'Failed to install required packages: astro-eslint-parser',
      })
      await vi.dynamicImportSettled()

      expect(confirm).toHaveBeenCalledTimes(3)
      expect(confirm.mock.calls[1][0].message).toContain('eslint-plugin-svelte')
      expect(confirm.mock.calls[1][0].message).not.toContain(
        'svelte-eslint-parser',
      )
      expect(installPackage.mock.calls).toEqual([
        [['astro-eslint-parser'], { dev: true }],
        [['@html-eslint/parser'], { dev: true }],
      ])
    } finally {
      firstConfirmation.resolve(false)
      firstInstallation.resolve()
      await result
      await vi.dynamicImportSettled()
    }
  })

  it('should not install packages when the prompt is canceled', async () => {
    enableInteractiveInstallFlow()

    const cancelSymbol = Symbol('cancel')
    const confirm = vi.fn().mockResolvedValue(cancelSymbol)
    const installPackage = vi.fn()

    vi.doMock('@clack/prompts', () => ({
      confirm,
      isCancel: (value: unknown) => value === cancelSymbol,
    }))
    vi.doMock('@antfu/install-pkg', () => ({
      installPackage,
    }))

    const { ensurePackages } = await import('../src/utils/ensurePackages')

    await expect(
      ensurePackages(['definitely-missing-package-for-tests']),
    ).resolves.toBeUndefined()
    expect(confirm).toHaveBeenCalledOnce()
    expect(installPackage).not.toHaveBeenCalled()
  })

  it('should throw contextual errors when installation fails', async () => {
    enableInteractiveInstallFlow()

    const confirm = vi.fn().mockResolvedValue(true)
    const installError = new Error('install failed')
    const installPackage = vi.fn().mockRejectedValue(installError)

    vi.doMock('@clack/prompts', () => ({
      confirm,
      isCancel: () => false,
    }))
    vi.doMock('@antfu/install-pkg', () => ({
      installPackage,
    }))

    const { ensurePackages } = await import('../src/utils/ensurePackages')

    await expect(
      ensurePackages(['definitely-missing-package-for-tests']),
    ).rejects.toThrow(
      'Failed to install required packages: definitely-missing-package-for-tests',
    )
    expect(installPackage).toHaveBeenCalledWith(
      ['definitely-missing-package-for-tests'],
      { dev: true },
    )
  })
})
