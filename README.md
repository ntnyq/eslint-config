# eslint-config

> Flat ESLint config for JavaScript, TypeScript, Vue 2, Vue 3, Prettier.

[![CI](https://github.com/ntnyq/eslint-config/workflows/CI/badge.svg)](https://github.com/ntnyq/eslint-config/actions)
[![NPM VERSION](https://img.shields.io/npm/v/@ntnyq/eslint-config/latest.svg)](https://www.npmjs.com/package/@ntnyq/eslint-config/v/latest)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/@ntnyq/eslint-config)](https://www.npmjs.com/package/@ntnyq/eslint-config)
[![LICENSE](https://img.shields.io/github/license/ntnyq/eslint-config.svg)](https://github.com/ntnyq/eslint-config/blob/main/LICENSE)

## Features

- Opinionable: single quotes, no semi, trailing comma, etc
- Designed to work alongside with [Prettier](https://prettier.io)
- Respect `.gitignore` via [eslint-config-flat-gitignore](https://github.com/antfu/eslint-config-flat-gitignore)
- Out-of-box support for TypeScript, Vue, JSON, Markdown, YAML, TOML, SVG and etc
- Strict but provides useful rules to guard your codebase
- Custom ESLint commands for [eslint-plugin-command](https://github.com/antfu/eslint-plugin-command)
- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files) for ESLint v9.5.0+

## Install

```bash
pnpm add eslint prettier typescript @ntnyq/eslint-config @ntnyq/prettier-config -D
```

## Usage

Highly recommended using **`eslint.config.mjs`** as the config file :

```js
// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig()
```

Add scripts `lint` in `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

<details>
<summary>💼 Intergrated with Prettier, VSCode, husky and nano-staged</summary>

<br>

## Prettier config

```js
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
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
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
    "*.{js,ts,cjs,mjs,jsx,tsx,vue,md,html,json,toml,yml,yaml}": "eslint --fix"
  }
}
```

### 3. Add a Git hook

```bash
echo "nano-staged" > .husky/pre-commit
```

</details>

## Advanced config

Check for detail in:

- [./src/types/config.ts](https://github.com/ntnyq/eslint-config/blob/main/src/types/config.ts)
- [./src/core.ts](https://github.com/ntnyq/eslint-config/blob/main/src/core.ts)

### Config interface

```ts
export interface ConfigOptions extends ConfigOptionsInternal, OptionsExtensions {
  command?: ConfigCommandOptions
  comments?: ConfigCommentsOptions
  ignores?: ConfigIgnoresOptions
  importX?: ConfigImportXOptions
  javascript?: ConfigJavaScriptOptions
  jsdoc?: ConfigJsdocOptions
  node?: ConfigNodeOptions
  specials?: ConfigSpecialsOptions

  /**
   * bellow can be disabled
   */
  antfu?: boolean | ConfigAntfuOptions
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
   * disabled by default
   */
  svgo?: boolean | ConfigSVGOOptions

  /**
   * disabled by default
   *
   * require `eslint-plugin-eslint-plugin` installed mannally
   */
  eslintPlugin?: boolean | ConfigESLintPluginOptions

  /**
   * disabled by default
   *
   * require `@stylistic/eslint-plugin` installed mannally
   */
  stylistic?: boolean | ConfigStylisticOptions
}
```

## Versioning policy

This project follows [Semantic Versioning](https://semver.org/) for releases.

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
