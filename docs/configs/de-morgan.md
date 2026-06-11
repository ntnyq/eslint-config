---
pageClass: page-config
sidebarDepth: 0
---

# DeMorgan

## 🔌 Plugins

- [eslint-plugin-de-morgan](https://github.com/azat-io/eslint-plugin-de-morgan)

## Options

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  deMorgan: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/deMorgan.ts)
