---
pageClass: page-config
sidebarDepth: 0
---

# Specials

## Options

### overridesCliRules

Overrides CLI rules.

- **Type**: `Rules`

### overridesBinRules

Overrides bin rules.

- **Type**: `Rules`

### overridesConfigFileRules

Overrides config files rules.

- **Type**: `Rules`

### overridesScriptsRules

Overrides scripts rules.

- **Type**: `Rules`

### overridesUserScriptsRules

Overrides user scripts rules.

- **Type**: `Rules`

### specialCaseConfigs

More special case configs.

- **Type**: `TypedConfigItem[]`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  specials: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/specials.ts)
