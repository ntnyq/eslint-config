---
pageClass: page-config
sidebarDepth: 0
---

# PNPM

## 🔌 Plugins

- [eslint-plugin-pnpm](https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm)

## Options

### json

Configure rules for `package.json` files. Set it to `false` to disable this
branch, or pass an object to customize its files and rules.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true`
- **Default files**: `[GLOB_PACKAGE_JSON]`

### yaml

Configure rules for `pnpm-workspace.yaml` files. Set it to `false` to disable
this branch, or pass an object to customize its files and rules.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true`
- **Default files**: `[GLOB_PNPM_WORKSPACE_YAML]`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  pnpm: {
    json: {
      overrides: {
        'pnpm/json-valid-catalog': 'warn',
      },
    },
    yaml: true,
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/pnpm.ts)
