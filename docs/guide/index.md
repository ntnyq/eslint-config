# Guide

This guide focuses on practical setup for frontend teams using `@ntnyq/eslint-config`.

## Requirements

- Node.js ^22.13.0 || >=24
- ESLint ^9.38.0 (or ^10)

## Quick Start

Install dependencies:

::: code-group

```shell [pnpm]
pnpm add -D eslint typescript @ntnyq/eslint-config
```

```shell [npm]
npm i -D eslint typescript @ntnyq/eslint-config
```

```shell [yarn]
yarn add -D eslint typescript @ntnyq/eslint-config
```

```shell [bun]
bun add -D eslint typescript @ntnyq/eslint-config
```

:::

Create `eslint.config.mjs`:

```js
// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig()
```

Add scripts:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

Run:

```shell
pnpm lint
```

## How Auto-Detection Works

`defineESLintConfig()` enables or disables parts based on your project context:

- `vue` enabled when Vue dependency exists
- `typescript` enabled when TypeScript dependency exists
- `test` enabled when Vitest dependency exists
- `prettier` enabled when Prettier dependency exists
- `unocss` enabled when UnoCSS dependency exists

You can always force behavior manually.

## Frontend Recipes

### Vue 3 + TypeScript

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  vue: true,
  typescript: {
    tsconfigPath: './tsconfig.app.json',
  },
})
```

### React + TypeScript

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  vue: false,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
})
```

### Enable optional configs when needed

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  svgo: true,
  html: true,
  unusedImports: true,
})
```

## Customization Basics

Override built-in rules:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  vue: {
    overrides: {
      'vue/multi-word-component-names': 'off',
    },
  },
})
```

Add project-level custom flat config blocks:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({}, [
  {
    files: ['**/scripts/**'],
    rules: {
      'no-console': 'off',
    },
  },
])
```

## Formatter Integration

Choose one formatter strategy for the project.

### Prettier path

```shell
pnpm add -D prettier @ntnyq/prettier-config
```

### Oxfmt path

```shell
pnpm add -D oxfmt
```

VS Code minimal settings:

```json
{
  "eslint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "source.organizeImports": "never",
  "source.sortImports": "never"
}
```

## Next Steps

- [Custom Configuration](./custom)
- [All Configs](../configs/)
- [FAQ](../faq)
- [Config Inspector](https://eslint-config-inspector.ntnyq.com/)
