# @ntnyq/eslint-config

> ESLint config for JavaScript, TypeScript, Vue, JSON, Markdown, YAML, TOML, SVG and etc.

[![CI](https://github.com/ntnyq/eslint-config/workflows/CI/badge.svg)](https://github.com/ntnyq/eslint-config/actions)
[![NPM VERSION](https://img.shields.io/npm/v/@ntnyq/eslint-config/latest.svg)](https://www.npmjs.com/package/@ntnyq/eslint-config/v/latest)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/@ntnyq/eslint-config)](https://www.npmjs.com/package/@ntnyq/eslint-config)
[![LICENSE](https://img.shields.io/github/license/ntnyq/eslint-config.svg)](https://github.com/ntnyq/eslint-config/blob/main/LICENSE)

> [!IMPORTANT]
> Feel free to create and maintain your own fork if you think this is too opinionated.

## Requirements

- Node.js ^20.19.0 || ^22.13.0 || >=24
- ESLint v9.20.0+

> [!TIP]
> For Node.js v18 support, please use [v4](https://github.com/ntnyq/eslint-config/tree/v4).
>
> For Node.js versions below 20.19.0, please use [v5](https://github.com/ntnyq/eslint-config/tree/v5).

## Features

- Designed to work alongside [Prettier](https://prettier.io) and [TypeScript](https://www.typescriptlang.org/)
- Opinionated: single quote, no semi, trailing comma, etc
- Respect `.gitignore` via [eslint-config-flat-gitignore](https://github.com/antfu/eslint-config-flat-gitignore)
- Out-of-the-box support for TypeScript, Vue, JSON, Markdown, YAML, TOML, SVG, etc
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

Highly recommend using **`eslint.config.mjs`** as the config file:

```js
// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig(
  // Options here
  {
    // Enable a config
    svgo: true,
    // Disable a config
    jsdoc: false,
    vue: {
      // Overrides built-in rules
      overrides: {
        'vue/slot-name-casing': 'off',
      },
    },
  },
  // Optional user configs here
  [
    {
      files: ['**/utils/*.ts'],
      rules: {
        'antfu/top-level-function': 'error',
      },
    },
  ],
)
```

Add a `lint` script to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

<details>
<summary>💼 Integrated with Prettier, VS Code, husky and nano-staged</summary>

<br>

## Prettier config

> Feel free to use your own prettier config.

Install `prettier` and set up your Prettier config:

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

import { defineConfig } from '@ntnyq/prettier-config'

export default defineConfig({
  // Custom options if needed
  printWidth: 100,
  trailingComma: 'none',
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

## VSCode config

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

For details, see:

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
   */
  command?: ConfigCommandOptions
  eslintComments?: ConfigESLintCommentsOptions
  ignores?: ConfigIgnoresOptions
  javascript?: ConfigJavaScriptOptions
  node?: ConfigNodeOptions

  /**
   * Configs below can be disabled
   */
  antfu?: boolean | ConfigAntfuOptions
  deMorgan?: boolean | ConfigDeMorganOptions
  depend?: boolean | ConfigDependOptions
  githubAction?: boolean | ConfigGitHubActionOptions
  gitignore?: boolean | ConfigGitIgnoreOptions
  importX?: boolean | ConfigImportXOptions
  jsdoc?: boolean | ConfigJsdocOptions
  jsonc?: boolean | ConfigJsoncOptions
  markdown?: boolean | ConfigMarkdownOptions
  ntnyq?: boolean | ConfigNtnyqOptions
  perfectionist?: boolean | ConfigPerfectionistOptions
  pinia?: boolean | ConfigPiniaOptions
  prettier?: boolean | ConfigPrettierOptions
  regexp?: boolean | ConfigRegexpOptions
  sort?: boolean | ConfigSortOptions
  specials?: boolean | ConfigSpecialsOptions
  test?: boolean | ConfigTestOptions
  toml?: boolean | ConfigTomlOptions
  typescript?: boolean | ConfigTypeScriptOptions
  unicorn?: boolean | ConfigUnicornOptions
  unocss?: boolean | ConfigUnoCSSOptions
  vue?: boolean | ConfigVueOptions
  yml?: boolean | ConfigYmlOptions

  /**
   * Configs below are disabled by default
   */
  astro?: boolean | ConfigAstroOptions
  html?: boolean | ConfigHtmlOptions
  pnpm?: boolean | ConfigPnpmOptions
  oxfmt?: boolean | ConfigOxfmtOptions
  svelte?: boolean | ConfigSvelteOptions
  svgo?: boolean | ConfigSVGOOptions
  eslintPlugin?: boolean | ConfigESLintPluginOptions
}
```

## Versioning policy

This project aims to follow [Semantic Versioning](https://semver.org/) for releases.

### Changes treated as Breaking Changes

- Node.js version requirement changes
- Huge refactors that might break the config
- Plugins made major changes that might break the config
- Changes that might affect most of the codebases

### Changes treated as Non-Breaking Changes

- Enable/disable rules and plugins (that might become stricter)
- Rule option changes
- Version bumps of dependencies

## Credits

- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## License

[MIT](./LICENSE) License © 2023-PRESENT [ntnyq](https://github.com/ntnyq)
