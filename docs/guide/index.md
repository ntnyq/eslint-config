# Guide

Welcome to the documentation for [@ntnyq/eslint-config](https://github.com/ntnyq/eslint-config)!

This guide will help you set up and configure ESLint with this opinionated preset.

## Requirements

Before you start, make sure you have the following versions installed:

- **Node.js**: `^20.19.0 || ^22.13.0 || >=24`
- **ESLint**: `^9.38.0`

::: tip
For Node.js v18 support, please use [v4](https://github.com/ntnyq/eslint-config/tree/v4).

For Node.js versions below 20.19.0, please use [v5](https://github.com/ntnyq/eslint-config/tree/v5).
:::

## Features

- ✅ Designed to work alongside formatter e.g: [Prettier](https://prettier.io) or [oxfmt](https://oxc.rs/docs/guide/usage/formatter)
- 🎯 Opinionated: single quote, no semi, trailing comma, etc
- 🪄 Respect `.gitignore` via [eslint-config-flat-gitignore](https://github.com/antfu/eslint-config-flat-gitignore)
- 📦 Out-of-the-box support for TypeScript, Vue, JSON, Markdown, YAML, TOML, SVG, Astro, Svelte, etc
- 🛡️ Strict but provides useful rules to guard your codebase
- 🔧 Custom ESLint commands for [eslint-plugin-command](https://github.com/antfu/eslint-plugin-command)
- 🎪 [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files) for ESLint v9.38.0+

## Install

::: code-group

```shell [npm]
npm i eslint typescript @ntnyq/eslint-config -D
```

```shell [yarn]
yarn add eslint typescript @ntnyq/eslint-config -D
```

```shell [pnpm]
pnpm add eslint typescript @ntnyq/eslint-config -D
```

```shell [bun]
bun add eslint typescript @ntnyq/eslint-config -D
```

:::

## Quick Start

Create an `eslint.config.mjs` file in your project root:

```js
// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig()
```

Add lint scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

That's it! Now you can run `npm run lint` to check your code.

## Configuration Options

You can customize the preset by passing options to `defineESLintConfig`:

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

## Integration

<details>
<summary>🟢 Prettier</summary>

::: code-group

```shell [npm]
npm i prettier @ntnyq/prettier-config -D
```

```shell [yarn]
yarn add prettier @ntnyq/prettier-config -D
```

```shell [pnpm]
pnpm add prettier @ntnyq/prettier-config -D
```

```shell [bun]
bun add prettier @ntnyq/prettier-config -D
```

:::

Create `prettier.config.mjs`:

```js
// @ts-check

import { defineConfig } from '@ntnyq/prettier-config'

export default defineConfig({
  // Custom options if needed
  printWidth: 100,
  trailingComma: 'none',
})
```

### VS Code

Add these settings to your `.vscode/settings.json`:

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

### Git Hooks (husky + nano-staged)

Lint changed files only before committing:

```shell
pnpm add husky nano-staged -D
```

Add to `package.json`:

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

Create a Git hook:

```shell
echo "nano-staged" > .husky/pre-commit
```

</details>

<details>
<summary>🔵 Oxfmt</summary>

::: code-group

```shell [npm]
npm i oxfmt -D
```

```shell [yarn]
yarn add oxfmt -D
```

```shell [pnpm]
pnpm add oxfmt -D
```

```shell [bun]
bun add oxfmt -D
```

:::

Create `.oxfmtrc.json`:

```json
{
  "$schema": "https://unpkg.com/oxfmt/configuration_schema.json",
  "arrowParens": "avoid",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "endOfLine": "lf",
  "experimentalSortPackageJson": false,
  "htmlWhitespaceSensitivity": "css",
  "ignorePatterns": [
    "**/node_modules/**",
    "**/dist/**",
    "pnpm-lock.yaml",
    "**/*.min.*",
    "**/tests/fixtures/**"
  ],
  "insertFinalNewline": true,
  "jsxSingleQuote": true,
  "objectWrap": "preserve",
  "overrides": [
    {
      "files": ["**/*.{css,scss}"],
      "options": {
        "singleQuote": false
      }
    },
    {
      "files": ["**/*.html"],
      "options": {
        "singleAttributePerLine": false
      }
    }
  ],
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "semi": false,
  "singleAttributePerLine": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "vueIndentScriptAndStyle": false
}
```

### VS Code

Add these settings to your `.vscode/settings.json`:

```json
{
  "oxc.enable": true,
  "eslint.enable": true,
  "prettier.enable": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "oxc.oxc-vscode",
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

### Git Hooks (husky + nano-staged)

Lint changed files only before committing:

```shell
pnpm add husky nano-staged -D
```

Add to `package.json`:

```json
{
  "scripts": {
    "prepare": "husky"
  },
  "nano-staged": {
    "*.{js,ts,cjs,mjs,jsx,tsx,vue,md,svg,yml,yaml,toml,json}": "eslint --fix",
    "*": "oxc --no-error-on-unmatched-pattern"
  }
}
```

Create a Git hook:

```shell
echo "nano-staged" > .husky/pre-commit
```

</details>

## View Rules

Check what rules are enabled using [ESLint Config Inspector](https://eslint-config-inspector.ntnyq.com/), powered by [@eslint/config-inspector](https://github.com/eslint/config-inspector).

## Next Steps

- Learn about [Custom Configuration](./custom)
- Explore available [Configs](/configs/)
- Check the [Config Interface](/configs/#config-interface)
