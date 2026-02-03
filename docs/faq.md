# FAQ

Frequently asked questions about `@ntnyq/eslint-config`.

## General

### Why use this config instead of creating my own?

This config provides:

- Battle-tested rules from real-world projects
- Automatic file type detection and configuration
- Regular updates for new ESLint/plugin releases
- Opinionated but sensible defaults
- Easy customization when needed

### Can I use this with JavaScript projects (without TypeScript)?

Yes! TypeScript is only required as a dev dependency. The config works perfectly with pure JavaScript projects. TypeScript configs will only activate when `.ts` files are detected.

## Configuration

### How do I disable a specific rule?

You can override rules in your config:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  typescript: {
    overrides: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
})
```

Or add custom configs:

```js
export default defineESLintConfig({}, [
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])
```

### How do I enable type-aware TypeScript rules?

Set the `tsconfigPath` option:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
})
```

### Can I use this in a monorepo?

Yes! The config works great in monorepos. You can:

1. Use a single config at the root
2. Create per-package configs with different options
3. Use file-based overrides for different workspace packages

```js
// Root eslint.config.mjs
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig(
  {
    typescript: true,
    vue: true,
  },
  [
    {
      files: ['packages/backend/**'],
      rules: {
        'no-console': 'off', // Allow console in backend
      },
    },
    {
      files: ['packages/frontend/**'],
      rules: {
        'no-console': 'error', // Disallow console in frontend
      },
    },
  ],
)
```

### How do I add custom file patterns?

Use the `files` option for each config:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  vue: {
    files: ['**/*.vue', '**/*.nvue'],
  },
  typescript: {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
  },
})
```

## Integration

### Does this work with Prettier?

Yes! This config is designed to work with Prettier. It:

- Disables formatting rules that conflict with Prettier
- Provides integration through `eslint-config-prettier`
- Recommends using `@ntnyq/prettier-config` for consistency

### How do I use this with VS Code?

Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and add to `.vscode/settings.json`:

```json
{
  "eslint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

See the [Guide](/guide/#vs-code) for complete VS Code setup.

### Can I use this with Vite/Webpack/Rollup?

Yes! This is an ESLint config that works with any build tool. Just run ESLint via:

- CLI: `eslint`
- npm script: `npm run lint`
- Editor integration
- Git hooks

### Does this work with Vitest/Jest?

Yes! Test framework rules are automatically enabled for test files. The config detects:

- `*.test.{js,ts,jsx,tsx}`
- `*.spec.{js,ts,jsx,tsx}`
- Files in `__tests__` directories

You can also manually enable test configs:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  test: {
    files: ['**/*.test.ts', '**/__tests__/**'],
  },
})
```

## Troubleshooting

### ESLint is slow in my project

Try these solutions:

1. **Disable type-aware rules** if not needed:

   ```js
   import { defineESLintConfig } from '@ntnyq/eslint-config'

   export default defineESLintConfig({
     typescript: {
       tsconfigPath: undefined, // or remove this line
     },
   })
   ```

2. **Ignore large directories**:

   ```js
   import { defineESLintConfig } from '@ntnyq/eslint-config'

   export default defineESLintConfig({
     ignores: ['**/dist/**', '**/node_modules/**'],
   })
   ```

3. **Use `.eslintcache`**:
   ```json
   {
     "scripts": {
       "lint": "eslint --cache"
     }
   }
   ```

### Rules are conflicting with Prettier

Make sure Prettier runs **after** ESLint:

```json
{
  "nano-staged": {
    "*.{js,ts,vue}": ["eslint --fix", "prettier -w"]
  }
}
```

Or use separate scripts:

```json
{
  "scripts": {
    "lint": "eslint",
    "format": "prettier -w ."
  }
}
```

### Import errors in TypeScript

Ensure TypeScript is properly configured:

1. Check `tsconfig.json` exists
2. Set `tsconfigPath` in config:

   ```js
   import { defineESLintConfig } from '@ntnyq/eslint-config'

   export default defineESLintConfig({
     typescript: {
       tsconfigPath: './tsconfig.json',
     },
   })
   ```

### Vue template errors

For Vue 3 projects, ensure:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  vue: {
    typescript: true, // If using <script lang="ts">
    sfcBlocks: true, // Enable SFC block processing
  },
})
```

### Rules not applying to specific files

Check:

1. Files aren't in `.gitignore` (unless `gitignore: false`)
2. File extensions match config patterns
3. No conflicting `ignores` patterns

Use `--debug` flag to see why files are ignored:

```shell
npx eslint --debug src/file.ts
```

## Migration

### From ESLint 8 to ESLint 9

This config requires ESLint 9. To migrate:

1. Update ESLint:

   ```shell
   npm install eslint@^9 -D
   ```

2. Replace `.eslintrc.*` with `eslint.config.mjs`

3. Update plugins and configs for flat config compatibility

See the [ESLint migration guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0).

### From v5 to v6

Major changes in v6:

- Node.js 20.19.0+ required
- ESLint 9.38.0+ required
- Updated plugin versions
- New config options

Check the [release notes](https://github.com/ntnyq/eslint-config/releases) for breaking changes.

## Support

### Where can I report issues?

- GitHub Issues: [ntnyq/eslint-config](https://github.com/ntnyq/eslint-config/issues)
- Discussions: [GitHub Discussions](https://github.com/ntnyq/eslint-config/discussions)

### How do I stay updated?

- Watch the [GitHub repository](https://github.com/ntnyq/eslint-config)
- Follow [@ntnyq](https://twitter.com/ntnyq) on Twitter
- Check [release notes](https://github.com/ntnyq/eslint-config/releases) regularly
