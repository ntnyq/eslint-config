---
pageClass: page-config
sidebarDepth: 0
---

# Test

## 🔌 Plugins

- [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest)

## Options

### files

Shared glob patterns for test files. A branch-level `files` value takes
precedence.

- **Type**: `string[]`
- **Default**: `['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']`

### base

Configure base test rules. Set it to `false` to disable this branch, or pass an
object to customize its files and rules.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true`

### vitest

Configure Vitest plugin rules. Set it to `false` to disable this branch, or pass
an object to customize its files and rules. The recommended rules include
`vitest/no-focused-tests`, which reports focused tests such as `test.only`.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true` if Vitest is in dependencies

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  test: {
    base: {
      overrides: {
        'no-console': 'off',
      },
    },
    vitest: {
      files: ['tests/**/*.test.ts'],
      overrides: {
        'vitest/expect-expect': 'warn',
      },
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/test.ts)
