---
pageClass: page-config
sidebarDepth: 0
---

# Svelte

## 🔌 Plugins

- [eslint-plugin-svelte](https://github.com/ota-meshi/eslint-plugin-svelte)

## Options

### files

Glob patterns for files to be linted.

- **Type**: `string[]`
- **Default**: `[GLOB_SVELTE]`

### extraFileExtensions

Additional file extensions.

- **Type**: `string[]`

### ecmaVersion

The ECMAScript version of the code being linted.

- **Type**: `Linter.EcmaVersion`
- **Default**: `'latest'`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/svelte.ts)
