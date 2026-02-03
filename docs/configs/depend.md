---
pageClass: page-config
sidebarDepth: 0
---

# Depend

## 🔌 Plugins

- [eslint-plugin-depend](https://github.com/es-tooling/eslint-plugin-depend)

## Options

### files

Glob patterns for files to be linted.

- **Type**: `string[]`
- **Default**: `[GLOB_SRC]`

### packageJson

Check deps in package.json.

- **Type**: `boolean`
- **Default**: `true`

### allowed

Allowed dependencies.

- **Type**: `string[]`
- **Default**: `[]`

### modules

Use customized modules to ban.

- **Type**: `string[]`
- **Default**: `[]`

### presets

Preset list.

- **Type**: `Array<'native' | 'microutilities' | 'preferred'>`
- **Default**: `['native', 'microutilities', 'preferred']`
- **See**: [ban-dependencies presets](https://github.com/es-tooling/eslint-plugin-depend/blob/main/docs/rules/ban-dependencies.md#presets)

### overrides

ESLint rule entries.

- **Type**: `Rules`

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/depend.ts)
