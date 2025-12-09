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

### sortTypes

Enable sort `types`.

- **Type**: `boolean`
- **Default**: `true`

### sortEnums

Enable sort `enums`.

- **Type**: `boolean`
- **Default**: `true`

### sortConstants

Enable sort `constants`.

- **Type**: `boolean`
- **Default**: `true`

### filesTypes

Files for `types`, will override default values.

- **Type**: `string[]`

### filesEnums

Files for `enums`, will override default values.

- **Type**: `string[]`

### filesConstants

Files for `constants`, will override default values.

- **Type**: `string[]`

### partitionByComment

Shared `partitionByComment` option.

- **Type**: `boolean | string | string[] | { block?: boolean | string | string[], line?: boolean | string | string[] }`
- **Default**: `['@pg', '@perfectionist-group']`
- **See**: [partitionByComment](https://perfectionist.dev/rules/sort-imports#partitionbycomment)

### overridesTypesRules

Overrides rules for `types`.

- **Type**: `Rules`

### overridesEnumsRules

Overrides rules for `enums`.

- **Type**: `Rules`

### overridesConstantsRules

Overrides rules for `constants`.

- **Type**: `Rules`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/perfectionist.ts)
