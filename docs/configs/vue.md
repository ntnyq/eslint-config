---
pageClass: page-config
sidebarDepth: 0
---

# Vue

## 🔌 Plugins

- [eslint-plugin-antfu](https://github.com/antfu/eslint-plugin-antfu)
- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)
- [eslint-plugin-vue-perfectionist](https://github.com/ntnyq/eslint-plugin-vue-perfectionist)

## Vue Perfectionist Rules

These rules are disabled by default. Set `vue.vuePerfectionist: true` or provide an options object to enable them for Vue files:

- `vue-perfectionist/callback-style`: require inline arrow callbacks with block bodies for Vue lifecycle and watch APIs.
- `vue-perfectionist/define-macros-newline`: require multiline inline macro declarations. Disabled when using Prettier or oxfmt.
- `vue-perfectionist/prefer-ref-pattern`: require template ref names to end in `Ref`.
- `vue-perfectionist/sort-script-setup`: group top-level statements in `<script setup>`, preserving order within each group. Macro groups follow the existing order: props, emits, options, slots, model, with expose last.

Customize or disable these rules through `vue.vuePerfectionist.overrides`.

## Options

### files

Glob patterns for files to be linted.

- **Type**: `string[]`

### sfcBlocks

Create virtual files for Vue SFC blocks to enable linting.

- **Type**: `boolean | VueBlocksOptions`
- **Default**: `true`
- **See**: [eslint-processor-vue-blocks](https://github.com/antfu/eslint-processor-vue-blocks)

### vuePerfectionist

Configure vue-perfectionist plugin rules.

- **Type**: `boolean | ConfigVueBranchOptions`
- **Default**: `false`

Set to `true` to enable the rules with default options, or pass an object with `files` and `overrides`; custom patterns should target files covered by the Vue config so its parser and processor apply. Branch `overrides` takes precedence over the default rules and formatter compatibility settings.

```js
export default defineESLintConfig({
  vue: {
    vuePerfectionist: true,
  },
})
```

### extraFileExtensions

Additional file extensions.

- **Type**: `string[]`

### typescript

Enable TypeScript support.

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
  vue: {
    overrides: {
      'vue/multi-word-component-names': 'off',
    },
    vuePerfectionist: {
      files: ['src/components/**/*.vue'],
      overrides: {
        'vue-perfectionist/prefer-ref-pattern': [
          'error',
          { pattern: '.+Element$' },
        ],
      },
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/vue.ts)
