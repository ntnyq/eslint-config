---
pageClass: page-config
sidebarDepth: 0
---

# Perfectionist

## 🔌 Plugins

- [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist)

## Options

### all

Enable all perfectionist rule.

Once enabled, all `types`, `enums` and `constants` related options will be ignored.

- **Type**: `boolean`
- **Default**: `false`

### common

Configure rules that apply to all source files.

- **Type**: `{ overrides?: Rules }`

### constants

Configure sorting for constants. Set it to `false` to disable this branch, or
pass an object to customize its files and rules.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true`

### enums

Configure sorting for enums. Set it to `false` to disable this branch, or pass
an object to customize its files and rules.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true`

### partitionByComment

Shared `partitionByComment` option.

- **Type**: `boolean | string | string[] | { block?: boolean | string | string[], line?: boolean | string | string[] }`
- **Default**: `['@pg', '@perfectionist-group']`
- **See**: [partitionByComment](https://perfectionist.dev/rules/sort-imports#partitionbycomment)

### types

Configure sorting for types. Set it to `false` to disable this branch, or pass
an object to customize its files and rules.

- **Type**: `boolean | { files?: string[], overrides?: Rules }`
- **Default**: `true`

## Frontend Scenario Example

Use this config in a typical frontend project by customizing individual
branches:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  perfectionist: {
    common: {
      overrides: {
        'perfectionist/sort-imports': 'warn',
      },
    },
    constants: false,
    types: {
      files: ['src/types/**/*.ts'],
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/perfectionist.ts)
