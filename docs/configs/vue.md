---
pageClass: page-config
sidebarDepth: 0
---

# Vue

## 🔌 Plugins

- [eslint-plugin-antfu](https://github.com/antfu/eslint-plugin-antfu)
- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)
- [eslint-plugin-vue-perfectionist](https://github.com/ntnyq/eslint-plugin-vue-perfectionist)

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

The enabled rules include:

- `vue-perfectionist/no-complex-template-expression` (`error`): limit each template expression to two logical operators and one level of ternary nesting. Checks interpolations and `v-if`, `v-else-if`, `v-show`, and `v-bind` expressions, including expressions using loop or slot variables. Extraction is manual; customize the limits through branch `overrides`.
- `vue-perfectionist/prefer-watch-effect-alias` (`error`): prefer `watchPostEffect` and `watchSyncEffect` over `watchEffect` with `flush: 'post'` or `flush: 'sync'`. Safe cases are automatically fixed. With auto-imports, fixes require an available alias import or an explicit `vueGlobals` rule option authorizing the replacement API.
- `vue-perfectionist/prefer-define-model` (`warn`): prefer `defineModel` over matching prop and `update:` event declarations in Vue 3.4+ components. Migration is manual; no automatic fixes are provided. Disable this rule through branch `overrides` for older Vue versions.

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
