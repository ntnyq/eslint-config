---
pageClass: page-config
sidebarDepth: 0
---

# Unicorn

## 🔌 Plugins

- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)

## Options

### preset

Use a built-in preset.

- **Type**: `'all' | 'recommended' | 'unopinionated'`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by disabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  unicorn: false,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/unicorn.ts)
