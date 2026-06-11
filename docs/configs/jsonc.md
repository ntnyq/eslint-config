---
pageClass: page-config
sidebarDepth: 0
---

# Jsonc

## 🔌 Plugins

- [eslint-plugin-jsonc](https://github.com/ota-meshi/eslint-plugin-jsonc)

## Options

### files

Glob patterns for files to be linted.

- **Type**: `string[]`
- **Default**: `['**/*.json', '**/*.json5', '**/*.jsonc']`

### usingFormatter

Whether using formatter config.

- **Type**: `boolean`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  jsonc: {
    overrides: {
      'jsonc/no-comments': 'off',
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/jsonc.ts)
