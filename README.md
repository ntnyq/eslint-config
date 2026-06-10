# @ntnyq/eslint-config

> ESLint flat config preset for modern frontend projects (TypeScript, Vue, JSON, Markdown, YAML, TOML, and more).

[![CI](https://github.com/ntnyq/eslint-config/workflows/CI/badge.svg)](https://github.com/ntnyq/eslint-config/actions)
[![NPM VERSION](https://img.shields.io/npm/v/@ntnyq/eslint-config/latest.svg)](https://www.npmjs.com/package/@ntnyq/eslint-config/v/latest)
[![NPM NEXT VERSION](https://img.shields.io/npm/v/@ntnyq/eslint-config/next.svg)](https://www.npmjs.com/package/@ntnyq/eslint-config/v/next)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/@ntnyq/eslint-config)](https://www.npmjs.com/package/@ntnyq/eslint-config)
[![LICENSE](https://img.shields.io/github/license/ntnyq/eslint-config.svg)](https://github.com/ntnyq/eslint-config/blob/main/LICENSE)

## Requirements

- Node.js ^22.13.0 || >=24
- ESLint ^9.38.0 (or ^10)

> [!TIP]
> Need legacy runtime support?
>
> - Node.js v18: use [v4](https://github.com/ntnyq/eslint-config/tree/v4)
> - Node.js < 20.19.0: use [v5](https://github.com/ntnyq/eslint-config/tree/v5)
> - Node.js < 22.13.0: use [v6](https://github.com/ntnyq/eslint-config/tree/v6)

## Why Frontend Teams Use It

- Works out of the box with ESLint flat config.
- Auto-detects and enables configs by your dependencies and file types.
- Covers common frontend files: TS, Vue SFC, JSON, Markdown, YAML, TOML.
- Keeps formatting tool friendly (Prettier or oxfmt).
- Supports scaling from single apps to monorepos.

## Install

```shell
# pnpm
pnpm add -D eslint typescript @ntnyq/eslint-config

# npm
npm i -D eslint typescript @ntnyq/eslint-config

# yarn
yarn add -D eslint typescript @ntnyq/eslint-config

# bun
bun add -D eslint typescript @ntnyq/eslint-config
```

## 60-Second Quick Start

1. Create `eslint.config.mjs` in project root.
2. Add npm scripts.
3. Run lint.

```js
// eslint.config.mjs
// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig()
```

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

```shell
pnpm lint
```

## Common Frontend Setups

### Vite + Vue 3 + TypeScript

```js
// eslint.config.mjs
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  vue: true,
  typescript: {
    tsconfigPath: './tsconfig.app.json',
  },
})
```

### Vite + React + TypeScript

```js
// eslint.config.mjs
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  vue: false,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
})
```

### Monorepo (apps + packages)

```js
// eslint.config.mjs
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig(
  {
    typescript: true,
    vue: true,
  },
  [
    {
      files: ['apps/web/**'],
      rules: {
        'no-console': 'warn',
      },
    },
    {
      files: ['packages/**'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
)
```

## Configuration Patterns

### Enable or disable modules

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  svgo: true,
  astro: true,
  jsdoc: false,
  unicorn: false,
})
```

### Override built-in rules

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  vue: {
    overrides: {
      'vue/slot-name-casing': 'off',
    },
  },
  typescript: {
    overrides: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
})
```

### Add project-specific flat config blocks

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

Use one formatter strategy in a project:

- Prettier path: install `prettier` and optional `@ntnyq/prettier-config`
- Oxfmt path: install `oxfmt`

### Prettier example

```shell
pnpm add -D prettier @ntnyq/prettier-config
```

```js
// prettier.config.mjs
// @ts-check

import { defineConfig } from '@ntnyq/prettier-config'

export default defineConfig()
```

### VS Code example

```json
{
  "eslint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never",
    "source.sortImports": "never"
  }
}
```

## Optional Configs (Disabled by Default)

- `astro`
- `eslintPlugin`
- `html`
- `pnpm`
- `svelte`
- `svgo`
- `unusedImports`

Enable them explicitly in `defineESLintConfig({ ... })` when needed.

## Inspect Final Rules

- Online inspector: [eslint-config-inspector.ntnyq.com](https://eslint-config-inspector.ntnyq.com/)
- Local inspect: `npx eslint --inspect-config path/to/file.ts`

## Advanced API

- [Config options type](./src/types/config.ts)
- [Factory implementation](./src/core.ts)

## Versioning Policy

This project follows Semantic Versioning with opinionated lint rules:

- Treated as breaking: Node.js engine changes, major plugin incompatibility, broad refactors.
- Treated as non-breaking: enabling/disabling rules, rule option tuning, dependency bumps.

## Credits

- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## License

[MIT](./LICENSE) License © 2023-PRESENT [ntnyq](https://github.com/ntnyq)
