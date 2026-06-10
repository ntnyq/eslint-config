# FAQ

Frequently asked questions for frontend developers using `@ntnyq/eslint-config`.

## Setup

### Can I use this in JavaScript-only projects?

Yes. Keep `typescript` dependency installed (recommended by this preset), and TS rules are only applied where relevant.

### Do I need Vue to use this config?

No. Vue-related rules are only auto-enabled when Vue exists in dependencies, and you can always force `vue: false`.

### Which formatter should I use?

Use one formatter strategy per project:

- Prettier stack: `prettier` (+ optional `@ntnyq/prettier-config`)
- Oxfmt stack: `oxfmt`

If both are installed, behavior follows config composition order. Keeping only one formatter is the safest setup.

## Configuration

### How do I disable a rule?

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

### How do I add custom rules for specific folders?

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({}, [
  {
    files: ['apps/web/**'],
    rules: {
      'no-console': 'warn',
    },
  },
])
```

### How do I enable type-aware rules?

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
})
```

## Performance

### ESLint is slow. What should I do?

1. Reduce type-aware scope via `filesTypeAware`.
2. Exclude generated files with `ignores`.
3. Use cache mode: `eslint --cache`.

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  typescript: {
    filesTypeAware: ['src/**/*.{ts,tsx,vue}'],
    ignoresTypeAware: ['**/*.md/**', '**/*.stories.ts'],
  },
  ignores: ['**/dist/**', '**/coverage/**'],
})
```

## Tooling

### How do I use it with VS Code?

Install ESLint extension and use:

```json
{
  "eslint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "source.organizeImports": "never",
  "source.sortImports": "never"
}
```

### Does this work with Vite, Next.js, or Nuxt?

Yes. This package is an ESLint flat config preset and is bundler/framework agnostic.

## Monorepo

### Can I use one root config for all apps?

Yes. Keep one root config and add per-directory overrides in the second argument:

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig(
  {
    typescript: true,
    vue: true,
  },
  [
    {
      files: ['apps/web/**'],
      rules: {
        'no-console': 'warn',
      },
    },
    {
      files: ['packages/**'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
)
```

## Debugging

### How can I inspect the final merged config?

- `npx eslint --inspect-config`
- [Config Inspector](https://eslint-config-inspector.ntnyq.com/)

### Rules are not applied to a file. Why?

Check:

1. File is not excluded by `.gitignore` or `ignores`.
2. File extension matches module `files` patterns.
3. No later config block overrides the same rule.

## Support

- Issues: [ntnyq/eslint-config issues](https://github.com/ntnyq/eslint-config/issues)
- Discussions: [GitHub Discussions](https://github.com/ntnyq/eslint-config/discussions)
