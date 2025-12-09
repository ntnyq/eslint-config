---
pageClass: page-config
sidebarDepth: 0
---

# Vue

## 🔌 Plugins

- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)
- [eslint-plugin-antfu](https://github.com/antfu/eslint-plugin-antfu)

## Options

### files

Glob patterns for files to be linted.

- **Type**: `string[]`

### sfcBlocks

Create virtual files for Vue SFC blocks to enable linting.

- **Type**: `boolean | VueBlocksOptions`
- **Default**: `true`
- **See**: [eslint-processor-vue-blocks](https://github.com/antfu/eslint-processor-vue-blocks)

### extraFileExtensions

Additional file extensions.

- **Type**: `string[]`

### typescript

Enable TypeScript support.

- **Type**: `boolean`
- **Default**: `false`

### ecmaVersion

The ECMAScript version of the code being linted.

- **Type**: `Linter.EcmaVersion`
- **Default**: `'latest'`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/vue.ts)
