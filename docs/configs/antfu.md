---
pageClass: page-config
sidebarDepth: 0
---

# Antfu

## 🔌 Plugins

- [eslint-plugin-antfu](https://github.com/antfu/eslint-plugin-antfu)

## Options

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  antfu: {
    overrides: {
      'antfu/top-level-function': 'off',
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/antfu.ts)
