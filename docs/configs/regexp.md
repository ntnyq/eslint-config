---
pageClass: page-config
sidebarDepth: 0
---

# Regexp

## 🔌 Plugins

- [eslint-plugin-regexp](https://github.com/ota-meshi/eslint-plugin-regexp)

## Options

### severity

Rule severity.

- **Type**: `'error' | 'warn'`
- **Default**: `'error'`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  regexp: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/regexp.ts)
