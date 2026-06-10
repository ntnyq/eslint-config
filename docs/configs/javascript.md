---
pageClass: page-config
sidebarDepth: 0
---

# JavaScript

## 🔌 Plugins

- [@eslint/js](https://github.com/eslint/js)
- [globals](https://github.com/sindresorhus/globals)

## Options

### strict

Enable strict checking for JavaScript files.

- **Type**: `boolean`
- **Default**: `false`

### ecmaVersion

The ECMAScript version of the code being linted.

- **Type**: `Linter.EcmaVersion`
- **Default**: `'latest'`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  javascript: {
    overrides: {
      'no-console': 'warn',
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/javascript.ts)
