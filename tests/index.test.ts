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

function enableInteractiveInstallFlow(): void {
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

  it.each([
    'clone',
    'remove',
    'append',
    'prepend',
    'replace',
    'override',
    'overrideRules',
    'renamePlugins',
  ])('should have method %s', method => {
    const config = defineESLintConfig()
    // eslint-disable-next-line unicorn/no-unsafe-property-key
    expect(config[method as keyof typeof config]).toBeInstanceOf(Function)
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
