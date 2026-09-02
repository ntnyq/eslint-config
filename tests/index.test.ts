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

  it('should apply oxfmt ignores to all formatter configs', async () => {
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

    expect(oxfmtConfigs).toHaveLength(2)
    for (const config of oxfmtConfigs) {
      expect(config.ignores).toContain(ignoredFile)
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
      'unicorn/no-multiple-promise-resolver-calls': 'error',
      'unicorn/no-transition-all': 'error',
      'unicorn/no-unnecessary-string-trim': 'error',
      'unicorn/no-useless-re-export': 'error',
      'unicorn/prefer-then-catch': 'error',
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
