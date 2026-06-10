---
pageClass: page-config
sidebarDepth: 0
---

# Sort

## Options

### packageJson

Enable package.json sorting.

- **Type**: `boolean`
- **Default**: `true`

### tsconfig

Enable tsconfig.json sorting.

- **Type**: `boolean`
- **Default**: `true`

### pnpmWorkspace

Enable pnpm-workspace.yaml sorting.

- **Type**: `boolean`
- **Default**: `true`

### jsonSchema

Enable JSON schema sorting.

- **Type**: `boolean`
- **Default**: `true`

### i18nLocale

Enable i18n locale sorting.

- **Type**: `boolean`
- **Default**: `true`

### additionalJsonFiles

JSON files to sort all properties alphabetically.

- **Type**: `string[]`

### additionalYamlFiles

YAML files to sort all properties alphabetically.

- **Type**: `string[]`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  sort: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/sort.ts)
