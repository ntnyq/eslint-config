---
pageClass: page-config
sidebarDepth: 0
---

# UnoCSS

## 🔌 Plugins

- [eslint-plugin-unocss](https://github.com/unocss/unocss/tree/main/packages-integrations/eslint-plugin)

## Options

### attributify

Enable attributify sort order.

- **Type**: `boolean`
- **Default**: `false`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  unocss: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/unocss.ts)
