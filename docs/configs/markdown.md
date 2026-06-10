---
pageClass: page-config
sidebarDepth: 0
---

# Markdown

## 🔌 Plugins

- [eslint-plugin-markdown](https://github.com/eslint/markdown)

## Options

### files

Glob patterns for code block files.

- **Type**: `string[]`
- **Default**: `['**/*.md/**']`

### extraFileExtensions

Additional file extensions.

- **Type**: `string[]`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  markdown: {
    overrides: {
      'no-console': 'off',
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/markdown.ts)
