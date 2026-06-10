---
pageClass: page-config
sidebarDepth: 0
---

# Node

## 🔌 Plugins

- [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)

## Options

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  node: {
    overrides: {
      'n/no-process-exit': 'off',
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/node.ts)
