# Documentation

This directory contains the VitePress documentation for `@ntnyq/eslint-config`.

## 📦 Structure

```
docs/
├── .vitepress/          # VitePress configuration
│   ├── config.ts        # Main config file
│   ├── meta.ts          # Site metadata
│   └── theme/           # Custom theme
├── configs/             # Config documentation pages
│   ├── index.md         # Configs overview
│   ├── javascript.md    # JavaScript config
│   ├── typescript.md    # TypeScript config
│   ├── vue.md           # Vue config
│   └── ...              # Other config docs
├── guide/               # User guides
│   ├── index.md         # Getting started
│   └── custom.md        # Custom configuration
├── public/              # Static assets
├── index.md             # Homepage
└── faq.md               # FAQ page
```

## 🚀 Development

Start the dev server:

```shell
pnpm docs:dev
```

Then visit <http://localhost:5173>.

## 🏗️ Build

Build the documentation:

```shell
pnpm docs:build
```

The output will be in `docs/.vitepress/dist`.

## 📝 Writing Documentation

### Adding a New Page

1. Create a new `.md` file in the appropriate directory
2. Add frontmatter if needed:
   ```md
   ---
   title: Page Title
   description: Page description
   ---
   ```
3. Update the navigation in `.vitepress/config.ts` if needed

### Adding a New Config Doc

Config documentation pages in `docs/configs/` are automatically added to the sidebar based on the filename.

Format:

```md
---
pageClass: page-config
sidebarDepth: 0
---

# Config Name

## 🔌 Plugins

List of plugins used...

## Options

### optionName

Description of the option.

- **Type**: `string`
- **Default**: `'value'`

## :mag: Implementation

- [Config source](https://github.com/ntnyq/eslint-config/blob/main/src/configs/xxx.ts)
```

### Code Examples

Use code blocks with syntax highlighting:

````markdown
```js
// Example code
import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig()
```
````

### Tips and Warnings

```markdown
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a danger message
:::
```

### Code Groups

````markdown
::: code-group

```shell [npm]
npm install package
```

```shell [pnpm]
pnpm add package
```

:::
````

## 🎨 Customization

### Theme

The theme is located in `.vitepress/theme/`. It extends the default VitePress theme with:

- UnoCSS for styling
- Shiki Twoslash for TypeScript tooltips
- Custom components

### Configuration

Main configuration is in `.vitepress/config.ts`:

- Site metadata
- Navigation
- Sidebar
- Search
- Social links

## 📚 Resources

- [VitePress Documentation](https://vitepress.dev/)
- [Markdown Extensions](https://vitepress.dev/guide/markdown)
- [Theme Configuration](https://vitepress.dev/reference/default-theme-config)

## 🔗 Deployment

The documentation is deployed to:

- Production: https://eslint-config.ntnyq.com
- Preview: Vercel automatic previews for PRs

Configuration is in `vercel.json` at the root.
