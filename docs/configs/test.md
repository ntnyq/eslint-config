---
pageClass: page-config
sidebarDepth: 0
---

# Test

## 🔌 Plugins

- [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest)
- [eslint-plugin-no-only-tests](https://github.com/levibuzolic/eslint-plugin-no-only-tests)

## Options

### files

Glob patterns for test files.

- **Type**: `string[]`
- **Default**: `['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']`

### vitest

Enable vitest plugin rules.

- **Type**: `boolean`
- **Default**: `true` if vitest in deps

### overridesVitestRules

Overrides built-in vitest rules.

- **Type**: `Rules`

### overrides

ESLint rule entries.

- **Type**: `Rules`

- **Type**: `Rules`

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/test.ts)
