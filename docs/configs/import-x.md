---
pageClass: page-config
sidebarDepth: 0
---

# ImportX

## 🔌 Plugins

- [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x)

## Options

### typescript

Enable TypeScript support.

- **Type**: `boolean`
- **Default**: `false`

### preferTypeScriptResolver

Use [eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript) if `typescript` is installed.

- **Type**: `boolean`
- **Default**: `true`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  importX: {
    overrides: {
      'import-x/no-cycle': 'off',
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/importX.ts)
