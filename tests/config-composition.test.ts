import { ESLint, Linter } from 'eslint'
import { describe, expect, it } from 'vitest'
import { defineESLintConfig } from '../src'

const linter = new Linter()

describe('config composition', () => {
  it('should preserve publishConfig export conditions when fixing package.json', async () => {
    const configs = await defineESLintConfig({ oxfmt: false, prettier: false })
    const conditions = {
      node: './node.js',
      import: './import.js',
      default: './default.js',
    }
    const publishConfig = { exports: { '.': conditions } }
    const name = 'example'
    const code = JSON.stringify({ publishConfig, name }, null, 2)
    const result = linter.verifyAndFix(code, configs, {
      filename: 'package.json',
    })

    expect(result.messages).toEqual([])
    expect(result.output).toBe(JSON.stringify({ name, publishConfig }, null, 2))
  })

  it('should sort export subpaths and conditions when fixing package.json', async () => {
    const configs = await defineESLintConfig({ oxfmt: false, prettier: false })
    const options = { filename: 'package.json' }
    const name = 'example'
    const conditions = {
      node: './node.js',
      browser: './browser.js',
      default: './default.js',
      require: './require.cjs',
      import: './import.js',
      types: './index.d.ts',
    }
    const sortedConditions = {
      types: './index.d.ts',
      import: './import.js',
      require: './require.cjs',
      default: './default.js',
      browser: './browser.js',
      node: './node.js',
    }
    const exports = {
      './zeta': './zeta.js',
      './alpha': './alpha.js',
      '.': conditions,
      './package.json': './package.json',
    }
    const result = linter.verifyAndFix(
      JSON.stringify({ name, exports }, null, 2),
      configs,
      options,
    )

    expect(result.messages).toEqual([])
    expect(result.output).toBe(
      JSON.stringify(
        {
          name,
          exports: {
            './package.json': './package.json',
            '.': sortedConditions,
            './alpha': './alpha.js',
            './zeta': './zeta.js',
          },
        },
        null,
        2,
      ),
    )

    const conditionalOnly = JSON.stringify(
      { name, exports: conditions },
      null,
      2,
    )

    expect(linter.verifyAndFix(conditionalOnly, configs, options)).toEqual({
      fixed: true,
      messages: [],
      output: JSON.stringify({ name, exports: sortedConditions }, null, 2),
    })
  })

  it('should lint Markdown code blocks and format the Markdown document', async () => {
    const code = [
      '#  Example',
      '',
      '```js',
      "import { join } from 'node:path'",
      '',
      'debugger',
      '```',
      '',
      '```ts',
      'const value: = 1',
      '```',
      '',
    ].join('\n')

    for (const prettier of [false, true]) {
      const eslint = new ESLint({
        overrideConfigFile: true,
        overrideConfig: await defineESLintConfig({
          oxfmt: !prettier,
          prettier,
          typescript: { tsconfigPath: './tsconfig.json' },
          unusedImports: true,
        }),
      })
      const results = await eslint.lintText(code, { filePath: 'example.md' })
      const messages = results.flatMap(result => result.messages)

      expect(messages).toContainEqual(
        expect.objectContaining({ line: 6, ruleId: 'no-debugger' }),
      )
      expect(messages).toContainEqual(
        expect.objectContaining({
          fatal: true,
          line: 10,
          message: 'Parsing error: Type expected.',
        }),
      )
      expect(messages).toContainEqual(
        expect.objectContaining({
          line: 1,
          ruleId: prettier ? 'prettier/prettier' : 'oxfmt/oxfmt',
        }),
      )
      expect(messages).not.toContainEqual(
        expect.objectContaining({ ruleId: 'unused-imports/no-unused-imports' }),
      )
    }
  })

  it('should sort JSON and YAML with their lint configs disabled', async () => {
    const configs = await defineESLintConfig({
      jsonc: false,
      oxfmt: false,
      prettier: false,
      yml: false,
    })
    const json = linter.verifyAndFix(
      '{ "include": [], "compilerOptions": {} }\n',
      configs,
      { filename: 'tsconfig.app.json' },
    )
    const yaml = linter.verifyAndFix('catalog: {}\npackages: []\n', configs, {
      filename: 'pnpm-workspace.yaml',
    })

    expect(json.messages).toEqual([])
    expect(json.output).toBe('{ "compilerOptions": {}, "include": [] }\n')
    expect(yaml.messages).toEqual([])
    expect(yaml.output).toBe('packages: []\ncatalog: {}\n')
  })

  it('should lint Astro client scripts without TypeScript project services', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: await defineESLintConfig({
        astro: true,
        oxfmt: false,
        prettier: false,
        typescript: { tsconfigPath: './tsconfig.json' },
      }),
    })
    const code = [
      '<script>',
      '  let values: number[] = []',
      '  values.push(1)',
      '</script>',
      '',
    ].join('\n')
    const results = await eslint.lintText(code, { filePath: 'component.astro' })
    const messages = results.flatMap(result => result.messages)

    expect(messages).toContainEqual(
      expect.objectContaining({ line: 2, ruleId: 'prefer-const' }),
    )
    expect(messages.some(message => message.fatal)).toBe(false)
  })

  it('should lint and format HTML with oxfmt enabled', async () => {
    const overrideConfig = await defineESLintConfig({
      html: { files: ['pages/*.html'] },
      oxfmt: { ignores: ['pages/unformatted.html'] },
      prettier: false,
    })
    const eslint = new ESLint({ overrideConfigFile: true, overrideConfig })
    const code = '<img src="example.png" />'
    const filePath = 'pages/index.html'
    const [result] = await eslint.lintText(code, { filePath })

    expect(result.messages).toContainEqual(
      expect.objectContaining({ ruleId: '@html-eslint/require-img-alt' }),
    )
    expect(result.messages).toContainEqual(
      expect.objectContaining({ ruleId: 'oxfmt/oxfmt' }),
    )

    const fixer = new ESLint({
      fix: true,
      overrideConfigFile: true,
      overrideConfig,
    })
    const [fixed] = await fixer.lintText(code, { filePath })

    expect(fixed.output).toBe(`${code}\n`)
    expect(fixed.messages).toEqual([
      expect.objectContaining({ ruleId: '@html-eslint/require-img-alt' }),
    ])

    const [formattedOnly] = await fixer.lintText(code, {
      filePath: 'index.html',
    })

    expect(formattedOnly.output).toBe(`${code}\n`)
    expect(formattedOnly.messages).toEqual([])

    const [lintedOnly] = await eslint.lintText(code, {
      filePath: 'pages/unformatted.html',
    })

    expect(lintedOnly.messages).toContainEqual(
      expect.objectContaining({ ruleId: '@html-eslint/require-closing-tags' }),
    )
    expect(lintedOnly.messages).not.toContainEqual(
      expect.objectContaining({ ruleId: 'oxfmt/oxfmt' }),
    )
  })
})
