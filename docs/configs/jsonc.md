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

### prettier

Whether disable prettier related rules.

- **Type**: `boolean`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/jsonc.ts)
