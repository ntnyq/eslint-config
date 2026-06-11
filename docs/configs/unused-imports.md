---
pageClass: page-config
sidebarDepth: 0
---

# Unused Imports

## 🔌 Plugins

- [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)

## Options

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  unusedImports: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/unusedImports.ts)
