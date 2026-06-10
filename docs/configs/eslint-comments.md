---
pageClass: page-config
sidebarDepth: 0
---

# ESLintComments

## 🔌 Plugins

- [eslint-plugin-eslint-comments](https://github.com/eslint-community/eslint-plugin-eslint-comments)

## Options

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by customizing it with a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  eslintComments: {
    overrides: {
      '@eslint-community/eslint-comments/no-unlimited-disable': 'off',
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/eslintComments.ts)
