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

The curated list also enables these correctness checks from Unicorn v77 at `error` severity:

| Rules                                            | Purpose                                                                                                    |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `unicorn/no-invalid-property-descriptor`         | Catch incompatible accessor and data descriptor properties, and misspelled descriptor keys.                |
| `unicorn/no-invalid-response-options`            | Catch invalid response statuses and combinations of response bodies and options.                           |
| `unicorn/no-invalid-url-protocol-comparison`     | Require the trailing colon when comparing URL protocols, such as `'https:'`.                               |
| `unicorn/no-url-in-search-params`                | Prevent passing a complete URL to `URLSearchParams`.                                                       |
| `unicorn/no-unsafe-json-serialization`           | Catch known JSON serialization errors and data loss involving values such as BigInt, Map, and Set.         |
| `unicorn/no-incomplete-accessor-override`        | Catch accessors that hide an inherited getter or setter.                                                   |
| `unicorn/no-invalid-intl-options`                | Catch invalid or incompatible internationalization options and missing required options.                   |
| `unicorn/require-text-decoder-streaming`         | Require streaming decoding for fetch-body chunks to preserve multibyte characters across chunk boundaries. |
| `unicorn/no-prevent-default-in-passive-listener` | Catch ineffective `preventDefault()` calls in passive event listeners.                                     |
| `unicorn/no-invalid-dom-token`                   | Catch empty or whitespace-containing tokens passed to DOM token lists.                                     |
| `unicorn/no-invalid-boolean-attribute-value`     | Catch misleading values such as `'false'` assigned to HTML boolean attributes.                             |
| `unicorn/no-invalid-style-set-property`          | Catch invalid CSS property names, values, and priorities passed to `style.setProperty()`.                  |
| `unicorn/no-invalid-temporal-arithmetic`         | Catch unsupported units and missing arguments in existing Temporal arithmetic calls.                       |

These are static checks, not complete runtime validation. In particular, `require-text-decoder-streaming` does not fully verify decoder reuse or the final flush, and the Temporal checks do not require migrating from `Date`.

`prefer-iterator-helpers`, `prefer-iterator-zip`, `prefer-uint8array-hex`, `prefer-json-import`, and the plugin's CSS rules are not enabled by default. Iterator and byte conversion recommendations require checking target runtime support; JSON imports change loading and caching behavior; CSS rules require a corresponding ESLint language configuration.

`prefer-promise-static-methods` and `no-unnecessary-parameters` remain opt-in because their suggested changes can affect Promise identity, exception timing, or intentional function boundaries. Formatting rules such as `indent` and `comma-spacing` are left to the formatter. The Markdown rules `no-empty-link-text` and `no-javascript-url` require separate configuration for Markdown prose.

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
