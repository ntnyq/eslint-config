---
pageClass: page-config
sidebarDepth: 0
---

# GitIgnore

## 🔌 Plugins

- [eslint-config-flat-gitignore](https://github.com/antfu/eslint-config-flat-gitignore)

## Options

This config accepts all options from [eslint-config-flat-gitignore](https://github.com/antfu/eslint-config-flat-gitignore#options) except `strict`, plus:

### strict

Throw an error if gitignore file not found.

- **Type**: `boolean`
- **Default**: `false`

## Frontend Scenario Example

Use this config in a typical frontend project by disabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  gitignore: false,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/gitignore.ts)
