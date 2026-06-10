---
pageClass: page-config
sidebarDepth: 0
---

# YAML

## 🔌 Plugins

- [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml)

## Options

### files

Glob patterns for YAML files.

- **Type**: `string[]`
- **Default**: `['**/*.{yml,yaml}']`

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
  yml: {
    overrides: {
      'yml/no-empty-document': 'off',
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/yml.ts)
