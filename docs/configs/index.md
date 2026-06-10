# Configs

This preset is modular. You can keep defaults, disable specific modules, or enable optional ones.

## How to Read This Page

- "Auto" means enabled by dependency/file detection.
- "Default On" means enabled unless you set it to `false`.
- "Optional" means disabled until you enable it explicitly.

## Auto or Default-On Modules

| Config                               | Purpose                  | Activation                  |
| ------------------------------------ | ------------------------ | --------------------------- |
| [JavaScript](./javascript)           | Base JS rules            | Default On                  |
| [TypeScript](./typescript)           | TS lint rules            | Auto (TypeScript installed) |
| [Vue](./vue)                         | Vue SFC lint rules       | Auto (Vue installed)        |
| [JSON/JSONC](./jsonc)                | JSON and JSONC           | Default On                  |
| [Markdown](./markdown)               | Markdown and code blocks | Default On                  |
| [YAML](./yml)                        | YAML files               | Default On                  |
| [TOML](./toml)                       | TOML files               | Default On                  |
| [Gitignore](./gitignore)             | Respect `.gitignore`     | Default On                  |
| [Ignores](./ignores)                 | Baseline ignores         | Default On                  |
| [Node](./node)                       | Node rules               | Default On                  |
| [Import X](./import-x)               | Import/export safety     | Default On                  |
| [Unicorn](./unicorn)                 | Code quality rules       | Default On                  |
| [Perfectionist](./perfectionist)     | Sorting rules            | Default On                  |
| [Antfu](./antfu)                     | Antfu plugin rules       | Default On                  |
| [ESLint Comments](./eslint-comments) | Lint directive comments  | Default On                  |
| [Command](./command)                 | Command comments         | Default On                  |
| [Test](./test)                       | Test file rules          | Auto (Vitest installed)     |
| [UnoCSS](./unocss)                   | Utility class linting    | Auto (UnoCSS installed)     |
| [Prettier](./prettier)               | Prettier bridge          | Auto (Prettier installed)   |
| [Oxfmt](./oxfmt)                     | Oxfmt bridge             | Auto (oxfmt installed)      |

## Optional Modules (Default Off)

| Config                             | Purpose                  | Enable                |
| ---------------------------------- | ------------------------ | --------------------- |
| [Astro](./astro)                   | Astro files              | `astro: true`         |
| [Svelte](./svelte)                 | Svelte files             | `svelte: true`        |
| [SVGO](./svgo)                     | SVG linting              | `svgo: true`          |
| [HTML](./html)                     | HTML linting             | `html: true`          |
| [Pinia](./pinia)                   | Pinia rules              | `pinia: true`         |
| [PNPM](./pnpm)                     | Workspace package checks | `pnpm: true`          |
| [ESLint Plugin](./eslint-plugin)   | For plugin authors       | `eslintPlugin: true`  |
| [Unused Imports](./unused-imports) | Cleanup helpers          | `unusedImports: true` |

## Minimal Usage

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig()
```

## Enable and Disable Modules

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  astro: true,
  svgo: true,
  jsdoc: false,
  unicorn: false,
})
```

## Per-Module Options

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  typescript: {
    tsconfigPath: './tsconfig.json',
    overrides: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  vue: {
    overrides: {
      'vue/multi-word-component-names': 'off',
    },
  },
})
```

## Full Type Interface

- [src/types/config.ts](https://github.com/ntnyq/eslint-config/blob/main/src/types/config.ts)
- [src/core.ts](https://github.com/ntnyq/eslint-config/blob/main/src/core.ts)

## Next Step

Open any config page from the sidebar to see:

- Plugins used
- Option definitions
- Example overrides
- Source implementation link
