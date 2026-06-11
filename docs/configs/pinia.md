---
pageClass: page-config
sidebarDepth: 0
---

# Pinia

## 🔌 Plugins

- [eslint-plugin-pinia](https://github.com/lisilinhart/eslint-plugin-pinia)

## Options

### files

Glob patterns for Pinia store files.

- **Type**: `string[]`
- **Default**: `['**/stores/**/*.{js,ts}']`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  pinia: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/pinia.ts)
