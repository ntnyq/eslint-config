---
pageClass: page-config
sidebarDepth: 0
---

# Ignores

## Options

Passing an array to extend the built-in ignores, or passing a function to modify the built-in ignores.

### customIgnores

Custom ignore patterns.

- **Type**: `string[] | ((ignores: string[]) => string[])`
- **Default**: `[]`

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/ignores.ts)
