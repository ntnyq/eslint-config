---
pageClass: page-config
sidebarDepth: 0
---

# TOML

## 🔌 Plugins

- [eslint-plugin-toml](https://github.com/ota-meshi/eslint-plugin-toml)

## Options

### files

Glob patterns for TOML files.

- **Type**: `string[]`
- **Default**: `['**/*.toml']`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  toml: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/toml.ts)
