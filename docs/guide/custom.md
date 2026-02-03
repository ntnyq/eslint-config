# Custom Configuration

This guide explains how to customize `@ntnyq/eslint-config` to fit your project's needs.

## Configuration Structure

The `defineESLintConfig` function accepts two parameters:

```ts
defineESLintConfig(options, userConfigs)
```

- **options**: Configuration options for built-in configs
- **userConfigs**: Additional ESLint flat configs

## Enabling/Disabling Configs

### Enable a Config

Some configs are disabled by default. Enable them by setting to `true`:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  svgo: true, // Enable SVGO linting
  astro: true, // Enable Astro support
  pnpm: true, // Enable pnpm workspace linting
})
```

### Disable a Config

Some configs are enabled by default. Disable them by setting to `false`:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  jsdoc: false, // Disable JSDoc linting
  unicorn: false, // Disable eslint-plugin-unicorn
  perfectionist: false, // Disable sorting rules
})
```

## Customizing Rules

### Override Rules in a Config

Pass an object with `overrides` to customize rules:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  vue: {
    overrides: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    },
  },
  typescript: {
    overrides: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
})
```

### Additional Custom Configs

Add your own flat configs as the second parameter:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig(
  {
    // Built-in options
  },
  [
    // Custom configs
    {
      files: ['**/utils/*.ts'],
      rules: {
        'antfu/top-level-function': 'error',
      },
    },
    {
      files: ['**/fixtures/**'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
)
```

## File Patterns

### Custom File Patterns

Specify custom file patterns for certain configs:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  vue: {
    files: ['**/*.vue', '**/*.nvue'], // Include .nvue files
  },
  typescript: {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
  },
})
```

### Type-Aware TypeScript

Configure type-aware linting:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  typescript: {
    tsconfigPath: './tsconfig.json',
    filesTypeAware: ['**/*.{ts,tsx}'],
    ignoresTypeAware: ['**/*.md/**', '**/*.config.ts'],
  },
})
```

## Config-Specific Options

Each config may have its own options. Here are some examples:

### JavaScript

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

defineESLintConfig({
  javascript: {
    strict: true, // Enable strict checking
    ecmaVersion: 2024, // Set ECMAScript version
    overrides: {
      'no-console': 'warn',
    },
  },
})
```

### Vue

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

defineESLintConfig({
  vue: {
    sfcBlocks: true, // Enable SFC blocks processing
    typescript: true, // Enable TypeScript in Vue files
    overrides: {
      'vue/multi-word-component-names': 'off',
    },
  },
})
```

### Markdown

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

defineESLintConfig({
  markdown: {
    files: ['**/*.md'],
    overrides: {
      'no-console': 'off',
      'no-unused-vars': 'off',
    },
  },
})
```

### Test Files

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

defineESLintConfig({
  test: {
    files: ['**/*.{test,spec}.{js,ts}', '**/__tests__/**'],
    overrides: {
      'no-console': 'off',
    },
  },
})
```

## Shareable Options

Some options are shared across multiple configs:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

defineESLintConfig({
  shareable: {
    indent: 2,
    quotes: 'single',
    // Other shared options
  },
})
```

## Ignoring Files

### Using gitignore

By default, files in `.gitignore` are ignored. You can disable this:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

defineESLintConfig({
  gitignore: false, // Disable gitignore integration
})
```

### Custom Ignores

Add custom ignore patterns:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

defineESLintConfig({
  ignores: ['**/dist/**', '**/node_modules/**', '**/.vitepress/cache/**'],
})
```

## Advanced Examples

### Monorepo Setup

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig(
  {
    vue: true,
    typescript: true,
  },
  [
    {
      files: ['packages/*/src/**'],
      rules: {
        'no-console': 'error',
      },
    },
    {
      files: ['apps/*/src/**'],
      rules: {
        'no-console': 'warn',
      },
    },
  ],
)
```

### Library Project

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  jsdoc: true,
  test: true,
  markdown: true,
  // Disable configs not needed for libraries
  vue: false,
  html: false,
})
```

### Vue 3 Application

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  vue: {
    typescript: true,
    sfcBlocks: true,
    overrides: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    },
  },
  typescript: {
    tsconfigPath: './tsconfig.app.json',
  },
  unocss: true,
})
```

## Debugging

To see the resolved configuration:

```shell
npx eslint --inspect-config
```

Or use the [ESLint Config Inspector](https://eslint-config-inspector.ntnyq.com/).

## See Also

- [All Available Configs](/configs/)
- [Config Interface](/configs/#config-interface)
- [TypeScript Type Definitions](https://github.com/ntnyq/eslint-config/blob/main/src/types/config.ts)
