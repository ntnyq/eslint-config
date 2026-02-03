---
pageClass: page-config
sidebarDepth: 0
---

# Prettier

## 🔌 Plugins

- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)

## Options

### disabledFiles

Glob of built-in disabled files.

- **Type**: `string[]`
- **Default**: `[GLOB_SVG, GLOB_TOML, GLOB_ASTRO, GLOB_SVELTE]`

### severity

Rule severity.

- **Type**: `'error' | 'warn'`
- **Default**: `'warn'`

### userDisabledFiles

Glob of user custom disabled files.

- **Type**: `string[]`
- **Default**: `[]`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/prettier.ts)
