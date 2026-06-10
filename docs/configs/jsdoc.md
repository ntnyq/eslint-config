---
pageClass: page-config
sidebarDepth: 0
---

# JSDoc

## 🔌 Plugins

- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)

## Options

### typescript

Enable TypeScript related rules.

- **Type**: `boolean`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  jsdoc: false,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/jsdoc.ts)
