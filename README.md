# @ntnyq/eslint-config

> ESLint config for JavaScript, TypeScript, Vue, JSON, Markdown, YAML, TOML, SVG and etc.

[![CI](https://github.com/ntnyq/eslint-config/workflows/CI/badge.svg)](https://github.com/ntnyq/eslint-config/actions)
[![NPM VERSION](https://img.shields.io/npm/v/@ntnyq/eslint-config/latest.svg)](https://www.npmjs.com/package/@ntnyq/eslint-config/v/latest)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/@ntnyq/eslint-config)](https://www.npmjs.com/package/@ntnyq/eslint-config)
[![LICENSE](https://img.shields.io/github/license/ntnyq/eslint-config.svg)](https://github.com/ntnyq/eslint-config/blob/main/LICENSE)

## Requirement

- NodeJS v20.11.0+
- ESLint v9.20.0+

## Features

- Designed to work alongside with [Prettier](https://prettier.io) and [TypeScript](https://www.typescriptlang.org/)
- Opinionable: single quote, no semi, trailing comma, etc
- Respect `.gitignore` via [eslint-config-flat-gitignore](https://github.com/antfu/eslint-config-flat-gitignore)
- Out-of-box support for TypeScript, Vue, JSON, Markdown, YAML, TOML, SVG and etc
- Strict but provides useful rules to guard your codebase
- Custom ESLint commands for [eslint-plugin-command](https://github.com/antfu/eslint-plugin-command)
- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files) for ESLint v9.20.0+

## Install

```shell
npm i eslint typescript @ntnyq/eslint-config -D
```

```shell
yarn add eslint typescript @ntnyq/eslint-config -D
```

```shell
pnpm add eslint typescript @ntnyq/eslint-config -D
```

```shell
bun add eslint typescript @ntnyq/eslint-config -D
```

## Usage

Highly recommended using **`eslint.config.mjs`** as the config file :

```js
// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  // Options here
})
```

Add scripts `lint` in `package.json`:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

<details>
<summary>💼 Intergrated with Prettier, VSCode, husky and nano-staged</summary>

<br>

## Prettier config

Install `prettier` and setup your prettier config:

```shell
npm i prettier @ntnyq/prettier-config -D
```

```shell
yarn add prettier @ntnyq/prettier-config -D
```

```shell
pnpm add prettier @ntnyq/prettier-config -D
```

```shell
bun add prettier @ntnyq/prettier-config -D
```

```js
// prettier.config.mjs
// @ts-check

import { config, defineConfig } from '@ntnyq/prettier-config'

export default defineConfig({
  ...config,

  // overrides if needed
  overrides: [
    {
      files: ['**/*.html'],
      options: {
        singleAttributePerLine: false,
      },
    },
    {
      files: ['**/*.{css,scss,less}'],
      options: {
        singleQuote: false,
      },
    },
  ],
})
```

## VSCode Config

```json
{
  "eslint.enable": true,
  "prettier.enable": true,
  "editor.formatOnSave": true,
  "prettier.configPath": "./prettier.config.mjs",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never",
    "source.sortImports": "never"
  },
  "eslint.validate": [
    "vue",
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

```shell
pnpm add husky nano-staged -D
```

### 2. Config in `package.json`

```json
{
  "scripts": {
    "prepare": "husky"
  },
  "nano-staged": {
    "*.{js,ts,cjs,mjs,jsx,tsx,vue,md,svg,yml,yaml,toml,json}": "eslint --fix",
    "*.{css,scss,html}": "prettier -uw"
  }
}
```

### 3. Add a Git hook

```shell
echo "nano-staged" > .husky/pre-commit
```

</details>

## View what rules are enabled

Please check [eslint-config-inspector](https://eslint-config-inspector.ntnyq.com/) powered by [@eslint/config-inspector](https://github.com/eslint/config-inspector).

## Advanced config

Check for detail in:

- [./src/types/config.ts](https://github.com/ntnyq/eslint-config/blob/main/src/types/config.ts)
- [./src/core.ts](https://github.com/ntnyq/eslint-config/blob/main/src/core.ts)

### Config interface

```ts
export interface ConfigOptions {
  /**
   * Shareable options
   */
  shareable?: OptionsShareable

  /**
   * Configs enabled by default
   * @pg
   */
  command?: ConfigCommandOptions
  eslintComments?: ConfigESLintCommentsOptions
  ignores?: ConfigIgnoresOptions
  importX?: ConfigImportXOptions
  javascript?: ConfigJavaScriptOptions
  jsdoc?: ConfigJsdocOptions
  node?: ConfigNodeOptions
  specials?: ConfigSpecialsOptions

  /**
   * Configs bellow can be disabled
   */
  antfu?: boolean | ConfigAntfuOptions
  deMorgan?: boolean | ConfigDeMorganOptions
  depend?: boolean | ConfigDependOptions
  githubAction?: boolean | ConfigGitHubActionOptions
  gitignore?: boolean | ConfigGitIgnoreOptions
  jsonc?: boolean | ConfigJsoncOptions
  markdown?: boolean | ConfigMarkdownOptions
  ntnyq?: boolean | ConfigNtnyqOptions
  perfectionist?: boolean | ConfigPerfectionistOptions
  pinia?: boolean | ConfigPiniaOptions
  prettier?: boolean | ConfigPrettierOptions
  regexp?: boolean | ConfigRegexpOptions
  sort?: boolean | ConfigSortOptions
  test?: boolean | ConfigTestOptions
  toml?: boolean | ConfigTomlOptions
  typescript?: boolean | ConfigTypeScriptOptions
  unicorn?: boolean | ConfigUnicornOptions
  unocss?: boolean | ConfigUnoCSSOptions
  vue?: boolean | ConfigVueOptions
  yml?: boolean | ConfigYmlOptions

  /**
   * Configs bellow are disabled by default
   */
  astro?: boolean | ConfigAstroOptions
  html?: boolean | ConfigHtmlOptions
  pnpm?: boolean | ConfigPnpmOptions
  svelte?: boolean | ConfigSvelteOptions
  svgo?: boolean | ConfigSVGOOptions
  eslintPlugin?: boolean | ConfigESLintPluginOptions
}
```

## Versioning policy

This project aims to follows [Semantic Versioning](https://semver.org/) for releases.

### Changes considered as Breaking Changes

- Node.js version requirement changes
- Huge refactors that might break the config
- Plugins made major changes that might break the config
- Changes that might affect most of the codebases

### Changes considered as Non-Breaking Changes

- Enable/disable rules and plugins (that might become stricter)
- Rules options changes
- Version bumps of dependencies

## Credits

- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## License

[MIT](./LICENSE) License © 2023-PRESENT [ntnyq](https://github.com/ntnyq)
