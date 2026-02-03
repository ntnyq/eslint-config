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
- **Default**: `[GLOB_SRC, GLOB_VUE]`

### ignores

Glob patterns for files to ignore.

- **Type**: `string[]`
- **Default**: `[]`

### filesExtensions

File extensions to format.

- **Type**: `string[]`
- **Default**: `GLOB_SRC_EXTENSIONS`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/oxfmt.ts)
