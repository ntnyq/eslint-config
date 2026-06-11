---
pageClass: page-config
sidebarDepth: 0
---

# GitHubAction

## 🔌 Plugins

- [eslint-plugin-github-action](https://github.com/ntnyq/eslint-plugin-github-action)

## Options

### files

Glob patterns for GitHub Action files.

- **Type**: `string[]`
- **Default**: `['.github/workflows/*.{yml,yaml}']`

### overrides

ESLint rule entries.

- **Type**: `Rules`

## Frontend Scenario Example

Use this config in a typical frontend project by enabling it directly or adding a focused override:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  githubAction: true,
})
```

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/githubAction.ts)
