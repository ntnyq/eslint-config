# eslint-config

> Flat ESLint config for JavaScript, TypeScript, Vue 2, Vue 3, Prettier.

[![CI](https://github.com/ntnyq/eslint-config/workflows/CI/badge.svg)](https://github.com/ntnyq/eslint-config/actions)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/@ntnyq/eslint-config)](https://www.npmjs.com/package/@ntnyq/eslint-config)
[![NPM VERSION](https://img.shields.io/npm/v/@ntnyq/eslint-config/latest.svg)](https://www.npmjs.com/package/@ntnyq/eslint-config/v/latest)
[![LICENSE](https://img.shields.io/github/license/ntnyq/eslint-config.svg)](https://github.com/ntnyq/eslint-config/blob/main/LICENSE)

## Features

- Opinionable: single quotes, no semi
- Designed to work alongside with [Prettier](https://prettier.io)
- Respect `.gitignore` via [eslint-config-flat-gitignore](https://github.com/antfu/eslint-config-flat-gitignore)
- Out-of-box support for TypeScript, Vue, JSON, Markdown, YAML, etc.
- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files) for ESLint v9.5.0+

## Install

```bash
pnpm add eslint prettier typescript @ntnyq/eslint-config @ntnyq/prettier-config -D
```

## Usage

Highly recommended using **`eslint.config.mjs`** as the config file :

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig()
```

Add scripts `lint` in `package.json` and config prettier:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
  "prettier": "@ntnyq/prettier-config"
}
```

## VSCode Config

```json
{
  "eslint.enable": true,
  "prettier.enable": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": [
    "vue",
    "html",
    "yaml",
    "toml",
    "json",
    "jsonc",
    "json5",
    "markdown",
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ]
}
```

## Lint changed files only

### 1. Add dependencies

```bash
pnpm add husky nano-staged -D
```

### 2. Config `package.json`

```json
{
  "scripts": {
    "prepare": "husky"
  },
  "nano-staged": {
    "*.{js,ts,cjs,mjs,jsx,tsx,vue,md,yml,yaml,json,html}": "eslint --fix"
  }
}
```

### 3. Add a git hook

```bash
echo "nano-staged" > .husky/pre-commit
```

## Advanced config

Check for detail in:

- [./src/types/config.ts](https://github.com/ntnyq/eslint-config/blob/main/src/types/config.ts)
- [./src/core.ts](https://github.com/ntnyq/eslint-config/blob/main/src/core.ts)

### Config interface

```ts
export interface ConfigOptions {
  ignores?: ConfigIgnoresOptions

  sort?: boolean | ConfigSortOptions

  command?: boolean | ConfigCommandOptions

  gitignore?: boolean | ConfigGitIgnoreOptions

  imports?: ConfigImportsOptions

  node?: ConfigNodeOptions

  javascript?: ConfigJavaScriptOptions

  typescript?: boolean | ConfigTypeScriptOptions

  unicorn?: boolean | ConfigUnicornOptions

  prettier?: boolean | ConfigPrettierOptions

  perfectionist?: boolean | ConfigPerfectionistOptions

  /**
   * @internal
   */
  unusedImports?: boolean | ConfigUnusedImportsOptions

  /**
   * @internal
   */
  antfu?: boolean | ConfigAntfuOptions

  /**
   * @internal
   */
  ntnyq?: boolean | ConfigNtnyqOptions

  comments?: boolean | ConfigCommentsOptions

  jsdoc?: boolean | ConfigJsdocOptions

  unocss?: boolean | ConfigUnoCSSOptions

  regexp?: boolean | ConfigRegexpOptions

  jsonc?: boolean | ConfigJsoncOptions

  yml?: boolean | ConfigYmlOptions

  markdown?: boolean | ConfigMarkdownOptions

  toml?: boolean | ConfigTomlOptions

  vue?: boolean | ConfigVueOptions

  test?: boolean | ConfigTestOptions
}
```

## Credits

- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## License

[MIT](./LICENSE) License © 2023-PRESENT [ntnyq](https://github.com/ntnyq)
