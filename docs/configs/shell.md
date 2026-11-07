---
pageClass: page-config
sidebarDepth: 0
---

# Shell

## 🔌 Plugins

- [@eslint/shell](https://github.com/eslint/shell)

Disabled by default. Enable with `shell: true` to lint shell scripts using the recommended rules.

The factory excludes these files from unscoped JavaScript rules and formatter bridges. Give custom rule configs an explicit `files` scope to apply them to shell scripts.

## Options

### files

Glob patterns for shell scripts.

- **Type**: `string[]`
- **Default**: `['**/*.{sh,bash}']`

### language

Shell dialect used to parse matching files. The dialect is selected explicitly, independently of the file extension or shebang.

- **Type**: `'bash' | 'posix' | 'mksh'`
- **Default**: `'bash'`

### overrides

ESLint rule entries. Overrides take precedence over the built-in rules.

- **Type**: `Rules`

## Frontend Scenario Example

Lint build and deployment scripts:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  shell: {
    files: ['scripts/**/*.sh'],
    language: 'posix',
    overrides: {
      'shell/no-unused-vars': ['error', { allowed: ['BUILD_ENV'] }],
    },
  },
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/shell.ts)
