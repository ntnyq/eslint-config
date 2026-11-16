---
pageClass: page-config
sidebarDepth: 0
---

# Unicorn

## 🔌 Plugins

- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)

## Default Rules

The curated rule list enables `unicorn/prefer-regexp-exec` for non-global regular
expression matches and `unicorn/require-spread-parentheses` for complex spread
arguments. `unicorn/prefer-regexp-test` remains enabled for boolean checks.

`unicorn/no-async-promise-finally` is not enabled by default. Use `overrides` to
enable it when your project disallows async `Promise#finally()` callbacks.

## Options

### preset

Use a built-in preset. When omitted, the config uses a curated rule list.
Selecting a preset replaces that list; `overrides` applies to either configuration.

- **Type**: `'all' | 'recommended' | 'unopinionated'`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by disabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  unicorn: false,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/unicorn.ts)
