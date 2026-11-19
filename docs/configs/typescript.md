---
pageClass: page-config
sidebarDepth: 0
---

# TypeScript

## 🔌 Plugins

- [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)
- [eslint-plugin-antfu](https://github.com/antfu/eslint-plugin-antfu)

## Options

### files

Glob patterns for files to be linted.

- **Type**: `string[]`

### filesTypeAware

Glob patterns for files that should be type aware.

- **Type**: `string[]`
- **Default**: `['**/*.{ts,tsx}']`

### ignoresTypeAware

Glob patterns for files that should not be type aware.

- **Type**: `string[]`
- **Default**: `['**/*.astro', '**/*.astro/*.ts', '**/*.md/**']`

### tsconfigPath

Enable type-aware linting for TypeScript files. This path selects the default project for out-of-project files matched by `allowDefaultProject`.

- **Type**: `string`

### allowDefaultProject

Globs of files to run with default project compiler.

- **Type**: `string[]`

### extraFileExtensions

Additional file extensions.

- **Type**: `string[]`

### ecmaVersion

The ECMAScript version of the code being linted.

- **Type**: `Linter.EcmaVersion`
- **Default**: `'latest'`

### parserOptions

Additional parser options.

- **Type**: `TSESLintParserOptions`

### overrides

ESLint rule entries.

- **Type**: `Rules`

### overridesTypeAwareRules

Overrides built-in type aware rules.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/typescript.ts)
