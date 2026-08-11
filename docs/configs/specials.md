---
pageClass: page-config
sidebarDepth: 0
---

# Specials

## Options

### additionalConfigs

Additional special-case configs appended after the built-in branches.

- **Type**: `TypedConfigItem[]`

### bin

Configure bin files.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true`

### cli

Configure CLI files.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true`

### configFiles

Configure config files.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true`

### scripts

Configure files under scripts directories.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true`

### shadcnVue

Configure generated shadcn-vue component files.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true` if shadcn-vue is in dependencies

### userScripts

Configure userscript files.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  specials: {
    cli: false,
    scripts: {
      files: ['tools/**/*.ts'],
      overrides: {
        'no-console': 'warn',
      },
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/specials.ts)
