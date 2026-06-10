---
pageClass: page-config
sidebarDepth: 0
---

# Command

## 🔌 Plugins

- [eslint-plugin-command](https://github.com/antfu/eslint-plugin-command)

## Options

This config accepts all options from [eslint-plugin-command](https://github.com/antfu/eslint-plugin-command#options), including:

### commands

Custom commands to add.

- **Type**: `CommandConfig[]`

### name

Name of the configuration.

- **Type**: `string`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  command: {},
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/command.ts)
