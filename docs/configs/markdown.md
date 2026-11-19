---
pageClass: page-config
sidebarDepth: 0
---

# Markdown

## 🔌 Plugins

- [eslint-plugin-markdown](https://github.com/eslint/markdown)

Markdown fences use the parser and lint rules for their file extensions. Type-aware checks and unused-import checks are disabled for snippets by default. The configured formatter can still format the Markdown document.

## Options

### files

Glob patterns for applying Markdown-specific rule overrides to code blocks.

- **Type**: `string[]`
- **Default**: `[GLOB_MARKDOWN_CODE]` (JavaScript and TypeScript files inside Markdown virtual paths)

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
