---
pageClass: page-config
sidebarDepth: 0
---

# PNPM

## 🔌 Plugins

- [eslint-plugin-pnpm](https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm)

## Options

### filesJson

Glob patterns for JSON files to be linted.

- **Type**: `string[]`
- **Default**: `[GLOB_PACKAGE_JSON]`

### filesYaml

Glob patterns for YAML files to be linted.

- **Type**: `string[]`
- **Default**: `[GLOB_PNPM_WORKSPACE_YAML]`

### overridesJsonRules

Overrides rules for JSON files.

- **Type**: `Rules`

### overridesYamlRules

Overrides rules for YAML files.

- **Type**: `Rules`

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/pnpm.ts)
