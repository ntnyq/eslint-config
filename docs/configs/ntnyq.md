---
pageClass: page-config
sidebarDepth: 0
---

# Ntnyq

## 🔌 Plugins

- [eslint-plugin-ntnyq](https://github.com/ntnyq/eslint-plugin-ntnyq)

## Options

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  ntnyq: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/ntnyq.ts)
