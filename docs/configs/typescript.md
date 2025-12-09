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
- **Default**: `['**/*.md/**', '**/*.astro/*.ts']`

### tsconfigPath

Enable type aware check for TypeScript files.

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

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/typescript.ts)
