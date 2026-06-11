---
pageClass: page-config
sidebarDepth: 0
---

# Astro

## 🔌 Plugins

- [eslint-plugin-astro](https://github.com/ota-meshi/eslint-plugin-astro)

## Options

### files

Glob patterns for files to be linted.

- **Type**: `string[]`
- **Default**: `[GLOB_ASTRO]`

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

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  astro: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/astro.ts)
