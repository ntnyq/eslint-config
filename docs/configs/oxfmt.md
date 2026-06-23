---
pageClass: page-config
sidebarDepth: 0
---

# Oxfmt

## 🔌 Plugins

- [eslint-plugin-oxfmt](https://github.com/ntnyq/eslint-plugin-oxfmt)

## Options

### files

Glob patterns for files to be linted.

- **Type**: `string[]`
- **Default**: `[GLOB_SRC, GLOB_VUE, GLOB_JSON, GLOB_JSON5, GLOB_JSONC, GLOB_YAML, GLOB_TOML, GLOB_MARKDOWN]`

### ignores

Glob patterns for files to ignore.

- **Type**: `string[]`
- **Default**: `[]`

### filesExtensions

File extensions to format.

- **Type**: `string[]`
- **Default**: `[GLOB_STYLE, GLOB_HTML]`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  oxfmt: {
    overrides: {
      'oxfmt/oxfmt': 'warn',
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/oxfmt.ts)
