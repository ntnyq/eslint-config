---
pageClass: page-config
sidebarDepth: 0
---

# SVGO

## 🔌 Plugins

- [eslint-plugin-svgo](https://github.com/ntnyq/eslint-plugin-svgo)

## Options

### files

Glob patterns for SVG files.

- **Type**: `string[]`
- **Default**: `['**/*.svg']`

### ignores

Ignored files.

- **Type**: `string[]`
- **Default**: `[]`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  svgo: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/svgo.ts)
