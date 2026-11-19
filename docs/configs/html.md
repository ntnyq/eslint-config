---
pageClass: page-config
sidebarDepth: 0
---

# HTML

## 🔌 Plugins

- [@html-eslint/eslint-plugin](https://github.com/yeonjuan/html-eslint)

Files matched by both HTML and oxfmt use the HTML parser for linting and oxfmt for formatting. On those files, oxfmt handles line breaks, indentation, tag spacing, and attribute quotes. The closing-tag rule accepts oxfmt's self-closing style for void elements.

## Options

### files

Glob patterns for files to be linted.

- **Type**: `string[]`
- **Default**: `[GLOB_HTML]`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  html: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/html.ts)
