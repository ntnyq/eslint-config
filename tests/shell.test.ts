import { Linter } from 'eslint'
import { describe, expect, it } from 'vitest'
import { configShell, defineESLintConfig } from '../src'

const linter = new Linter()

describe('shell config', () => {
  it.each(['script.sh', 'script.bash'])(
    'should report and fix unquoted expansions in %s',
    filename => {
      const configs = configShell()
      const code = 'echo $HOME\n'
      const messages = linter.verify(code, configs, { filename })
      const result = linter.verifyAndFix(code, configs, { filename })

      expect(messages).toContainEqual(
        expect.objectContaining({
          ruleId: 'shell/no-unquoted-expansions',
          severity: 2,
        }),
      )
      expect(result.fixed).toBe(true)
      expect(result.output).toBe('echo "$HOME"\n')
      expect(result.messages).toEqual([])
    },
  )

  it('should respect custom files and rule overrides', () => {
    const configs = configShell({
      files: ['scripts/**/deploy'],
      overrides: {
        'shell/no-unquoted-expansions': 'off',
        'shell/no-unused-vars': ['error', { allowed: ['BUILD_ENV'] }],
      },
    })

    expect(
      linter.verify('BUILD_ENV=production\necho $HOME\n', configs, {
        filename: 'scripts/deploy',
      }),
    ).toEqual([])
    expect(
      linter.verify('echo $HOME\n', configs, { filename: 'other.sh' }),
    ).not.toContainEqual(
      expect.objectContaining({ ruleId: 'shell/no-unquoted-expansions' }),
    )
    expect(
      linter.verify('const value = 1\n', configs, { filename: 'script.js' }),
    ).toEqual([])
  })

  it.each([
    { language: 'bash', fatal: false },
    { language: 'posix', fatal: true },
    { language: 'mksh', fatal: false },
  ] as const)('should parse the $language dialect', ({ language, fatal }) => {
    const messages = linter.verify(
      'values=(one two)\nprintf "%s\\n" "$values"\n',
      configShell({ language }),
      { filename: 'script.sh' },
    )

    expect(messages.some(message => message.fatal)).toBe(fatal)
    expect(messages.filter(message => message.ruleId)).toEqual([])
  })

  it('should remain disabled unless enabled', async () => {
    for (const shell of [undefined, false]) {
      const configs = await defineESLintConfig({ shell })

      expect(configs.some(config => config.name === 'ntnyq/shell')).toBe(false)
    }
  })

  it.each([false, true])(
    'should lint shell scripts with prettier %s',
    async prettier => {
      const configs = await defineESLintConfig({ shell: true, prettier })
      const result = linter.verifyAndFix('echo $HOME\n', configs, {
        filename: 'scripts/build.sh',
      })

      expect(result.fixed).toBe(true)
      expect(result.output).toBe('echo "$HOME"\n')
      expect(result.messages).toEqual([])
    },
  )

  it('should forward shell options through the factory', async () => {
    const configs = await defineESLintConfig({
      shell: {
        files: ['scripts/**/deploy'],
        language: 'posix',
        overrides: {
          'shell/no-unquoted-expansions': 'warn',
        },
      },
    })
    const messages = linter.verify('echo $HOME\n', configs, {
      filename: 'scripts/deploy',
    })

    expect(messages).toEqual([
      expect.objectContaining({
        ruleId: 'shell/no-unquoted-expansions',
        severity: 1,
      }),
    ])
  })

  it('should preserve JavaScript rules and explicitly scoped user configs', async () => {
    const configs = await defineESLintConfig(
      { shell: true, oxfmt: false, prettier: false },
      {
        files: ['**/*.sh'],
        rules: {
          'shell/no-unquoted-expansions': 'warn',
        },
      },
    )
    const shellMessages = linter.verify('echo $HOME\n', configs, {
      filename: 'script.sh',
    })
    const scriptMessages = linter.verify('debugger\n', configs, {
      filename: 'script.js',
    })

    expect(shellMessages).toEqual([
      expect.objectContaining({
        ruleId: 'shell/no-unquoted-expansions',
        severity: 1,
      }),
    ])
    expect(scriptMessages).toContainEqual(
      expect.objectContaining({ ruleId: 'no-debugger', severity: 2 }),
    )
  })
})
