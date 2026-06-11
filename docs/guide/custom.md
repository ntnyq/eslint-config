# Custom Configuration

This page shows practical customization patterns for frontend projects.

## API Shape

`defineESLintConfig` accepts built-in options and optional user config blocks:

```ts
defineESLintConfig(options, ...userConfigs)
```

- `options`: toggle or configure built-in modules
- `userConfigs`: append raw flat config blocks for project-specific rules

## Common Customization Patterns

### 1) Enable optional modules

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  astro: true,
  html: true,
  svgo: true,
  unusedImports: true,
})
```

### 2) Disable noisy modules for your team

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  jsdoc: false,
  unicorn: false,
  perfectionist: false,
})
```

### 3) Override built-in rules safely

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  typescript: {
    overrides: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  vue: {
    overrides: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    },
  },
})
```

### 4) Add app-specific flat config blocks

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig(
  {
    vue: true,
    typescript: true,
  },
  [
    {
      files: ['apps/admin/**'],
      rules: {
        'no-console': 'warn',
      },
    },
    {
      files: ['packages/**/test/**'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
)
```

## Type-Aware TypeScript

Type-aware linting is useful for app code, but can slow down large repos.

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  typescript: {
    tsconfigPath: './tsconfig.json',
    filesTypeAware: ['src/**/*.{ts,tsx,vue}'],
    ignoresTypeAware: ['**/*.md/**', '**/*.stories.ts'],
  },
})
```

## Vue-Specific Tuning

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  vue: {
    sfcBlocks: true,
    files: ['**/*.vue', '**/*.nvue'],
    overrides: {
      'vue/multi-word-component-names': 'off',
    },
  },
})
```

## Ignore Strategy

By default, `.gitignore` is respected.

### Disable `.gitignore` integration

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  gitignore: false,
})
```

### Add extra ignores

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  ignores: ['**/dist/**', '**/.output/**', '**/coverage/**'],
})
```

## Shareable Style Options

Use `shareable` to keep style settings aligned across modules:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  shareable: {
    ecmaVersion: 'latest',
    extraFileExtensions: ['.mdx'],
    typescript: true,
  },
})
```

## Debugging Resolved Config

```shell
npx eslint --inspect-config path/to/file.ts
```

Or use [Config Inspector](https://eslint-config-inspector.ntnyq.com/).

## See Also

- [Guide](./)
- [All Configs](../configs/)
- [Type Definitions](https://github.com/ntnyq/eslint-config/blob/main/src/types/config.ts)
