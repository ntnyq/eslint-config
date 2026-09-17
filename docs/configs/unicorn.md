---
pageClass: page-config
sidebarDepth: 0
---

# Unicorn

## 🔌 Plugins

- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)

## Default Rules

The default config uses a curated rule list. It includes these checks at `error` severity:

| Rules                                     | Purpose                                                                                                                    |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `unicorn/no-unused-builtin-method-return` | Detect discarded array, Set, and Temporal method results. Replaces the deprecated `unicorn/no-unused-array-method-return`. |
| `unicorn/no-unused-iterator-helper`       | Detect discarded lazy iterator helpers whose callbacks would never run.                                                    |
| `unicorn/no-async-iterator-callback`      | Prevent asynchronous callbacks in synchronous iterator helpers that do not await them.                                     |
| `unicorn/no-using-resource-escape`        | Prevent returning or exporting disposed `using` resources or functions that capture them.                                  |
| `unicorn/no-useless-set-construction`     | Remove redundant Set construction around collection operations.                                                            |
| `unicorn/prefer-temporal-conversion`      | Prefer direct conversions between existing Temporal values.                                                                |
| `unicorn/prefer-combined-guards`          | Combine consecutive guards with identical exits.                                                                           |
| `unicorn/no-accidental-bitwise-operator`  | Catch likely confusion between bitwise and logical operators.                                                              |
| `unicorn/no-boolean-sort-comparator`      | Reject boolean-returning sort comparators.                                                                                 |
| `unicorn/no-chained-comparison`           | Catch chained comparisons such as `a < b < c`.                                                                             |
| `unicorn/no-duplicate-logical-operands`   | Detect adjacent duplicate operands in logical expressions.                                                                 |

`prefer-iterator-helpers`, `prefer-iterator-zip`, `prefer-uint8array-hex`, `prefer-json-import`, and the plugin's CSS rules are not enabled by default. Iterator and byte conversion recommendations require checking target runtime support; JSON imports change loading and caching behavior; CSS rules require a corresponding ESLint language configuration.

Selecting a `preset` replaces the curated list with that plugin preset. Use `overrides` to adjust either configuration:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  unicorn: {
    overrides: {
      'unicorn/prefer-combined-guards': 'off',
    },
  },
})
```

## Options

### preset

Use a built-in preset.

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
