---
pageClass: page-config
sidebarDepth: 0
---

# Sort

Sorting applies to its configured files even when `jsonc` or `yml` is disabled. Use the options below to disable individual sorts, or set `sort: false` to disable all sorting.

## Options

### packageJson

Enable `package.json` sorting. Within `exports`, keys follow the order `./package.json`, `types`, `import`, `require`, and `default` where present. Remaining keys sort alphabetically. Reordering conditions can change which entry point is resolved. Keys inside `publishConfig.exports` keep their original order.

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
