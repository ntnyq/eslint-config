# Configs

`@ntnyq/eslint-config` provides a collection of composable ESLint configurations for different file types and use cases. All configs are automatically enabled based on your project structure, or you can enable/disable them manually.

## Config Status

### Enabled by Default

These configs are enabled automatically when relevant files are detected in your project:

| Config                               | Description                  | Auto-detect               |
| ------------------------------------ | ---------------------------- | ------------------------- |
| [JavaScript](./javascript)           | Base JavaScript rules        | Always                    |
| [TypeScript](./typescript)           | TypeScript support and rules | `*.ts`, `*.tsx` files     |
| [Vue](./vue)                         | Vue 3 SFC linting            | `*.vue` files             |
| [JSON/JSONC](./jsonc)                | JSON/JSONC linting           | `*.json`, `*.jsonc` files |
| [Markdown](./markdown)               | Markdown linting             | `*.md` files              |
| [YAML](./yaml)                       | YAML linting                 | `*.yaml`, `*.yml` files   |
| [TOML](./toml)                       | TOML linting                 | `*.toml` files            |
| [Gitignore](./gitignore)             | Respect .gitignore patterns  | `.gitignore` exists       |
| [Ignores](./ignores)                 | Common ignore patterns       | Always                    |
| [Node](./node)                       | Node.js rules                | Always                    |
| [Import X](./import-x)               | Import/export linting        | Always                    |
| [Unicorn](./unicorn)                 | Quality/style rules          | Always                    |
| [Perfectionist](./perfectionist)     | Sorting and formatting       | Always                    |
| [Antfu](./antfu)                     | Anthony Fu's custom rules    | Always                    |
| [ESLint Comments](./eslint-comments) | ESLint directive comments    | Always                    |
| [Command](./command)                 | Magic ESLint commands        | Always                    |

### Disabled by Default

These configs must be explicitly enabled in your configuration:

| Config                           | Description                         | Enable with            |
| -------------------------------- | ----------------------------------- | ---------------------- |
| [Astro](./astro)                 | Astro component linting             | `astro: true`          |
| [Svelte](./svelte)               | Svelte component linting            | `svelte: true`         |
| [SVGO](./svgo)                   | SVG optimization linting            | `svgo: true`           |
| [HTML](./html)                   | HTML file linting                   | `html: true`           |
| [Pinia](./pinia)                 | Pinia store rules                   | `pinia: true`          |
| [PNPM](./pnpm)                   | PNPM workspace linting              | `pnpm: true`           |
| [Test](./test)                   | Test framework rules                | Auto-detect test files |
| [ESLint Plugin](./eslint-plugin) | Rules for ESLint plugin development | `eslintPlugin: true`   |

## Usage

### Enable/Disable Configs

```js
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  // Enable optional configs
  svgo: true,
  astro: true,

  // Disable default configs
  jsdoc: false,
  unicorn: false,
})
```

### Configure Options

Each config can accept options:

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
    sfcBlocks: true,
    overrides: {
      'vue/multi-word-component-names': 'off',
    },
  },
})
```

## Config Interface

The complete TypeScript interface for configuration options:

```ts
export interface ConfigOptions {
  /**
   * Shareable options
   */
  shareable?: OptionsShareable

  /**
   * Configs enabled by default
   */
  command?: ConfigCommandOptions
  eslintComments?: ConfigESLintCommentsOptions
  ignores?: ConfigIgnoresOptions
  javascript?: ConfigJavaScriptOptions
  node?: ConfigNodeOptions

  /**
   * Configs below can be disabled
   */
  antfu?: boolean | ConfigAntfuOptions
  deMorgan?: boolean | ConfigDeMorganOptions
  depend?: boolean | ConfigDependOptions
  githubAction?: boolean | ConfigGitHubActionOptions
  gitignore?: boolean | ConfigGitIgnoreOptions
  importX?: boolean | ConfigImportXOptions
  jsdoc?: boolean | ConfigJsdocOptions
  jsonc?: boolean | ConfigJsoncOptions
  markdown?: boolean | ConfigMarkdownOptions
  ntnyq?: boolean | ConfigNtnyqOptions
  perfectionist?: boolean | ConfigPerfectionistOptions
  pinia?: boolean | ConfigPiniaOptions
  prettier?: boolean | ConfigPrettierOptions
  regexp?: boolean | ConfigRegexpOptions
  sort?: boolean | ConfigSortOptions
  specials?: boolean | ConfigSpecialsOptions
  test?: boolean | ConfigTestOptions
  toml?: boolean | ConfigTomlOptions
  typescript?: boolean | ConfigTypeScriptOptions
  unicorn?: boolean | ConfigUnicornOptions
  unocss?: boolean | ConfigUnoCSSOptions
  vue?: boolean | ConfigVueOptions
  yml?: boolean | ConfigYmlOptions

  /**
   * Configs below are disabled by default
   */
  astro?: boolean | ConfigAstroOptions
  html?: boolean | ConfigHtmlOptions
  pnpm?: boolean | ConfigPnpmOptions
  oxfmt?: boolean | ConfigOxfmtOptions
  svelte?: boolean | ConfigSvelteOptions
  svgo?: boolean | ConfigSVGOOptions
  eslintPlugin?: boolean | ConfigESLintPluginOptions
}
```

For detailed type definitions, see:

- [src/types/config.ts](https://github.com/ntnyq/eslint-config/blob/main/src/types/config.ts)
- [src/core.ts](https://github.com/ntnyq/eslint-config/blob/main/src/core.ts)

## Config Details

Click on each config name in the sidebar to see:

- Plugins used
- Available options
- Default configuration
- Implementation source

## See Also

- [Guide](/guide/) - Getting started guide
- [Custom Configuration](/guide/custom) - Advanced customization
- [ESLint Config Inspector](https://eslint-config-inspector.ntnyq.com/) - Visual rule browser
