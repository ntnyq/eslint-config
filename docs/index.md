---
layout: home

hero:
  name: ESLint Config
  text: An opinionated ESLint config preset
  tagline: Battle-tested, TypeScript & Vue ready, works with Prettier
  image:
    light: /logo.svg
    dark: /logo.svg
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View Configs
      link: /configs/
    - theme: alt
      text: Inspector
      link: https://eslint-config-inspector.ntnyq.com
      target: _blank

features:
  - icon: ⚡️
    title: Zero Config
    details: Works out of the box with sensible defaults. Just install and start linting.

  - icon: 🎯
    title: Opinionated
    details: Single quote, no semicolons, trailing commas. Battle-tested preferences from real projects.

  - icon: 📦
    title: All-in-One
    details: Support for TypeScript, Vue, JSON, Markdown, YAML, TOML, SVG, Astro, Svelte, and more.

  - icon: 🔧
    title: Customizable
    details: Easy to override rules and add custom configurations for your specific needs.

  - icon: 🪄
    title: Auto-detect
    details: Automatically applies the right configs based on your project structure.

  - icon: 🎨
    title: Formatter Ready
    details: Designed to work seamlessly with formatters like prettier or oxfmt. No conflicts, just clean code.

  - icon: 🛡️
    title: Strict but Sensible
    details: Catches real bugs while staying pragmatic. Guards your codebase effectively.

  - icon: 🚀
    title: ESLint 9 + Flat Config
    details: Built on the latest ESLint with modern flat config for better performance.

  - icon: 💡
    title: Command Shortcuts
    details: Use magic ESLint commands to quickly disable rules or add ignores inline.
---

## Quick Start

Install the package:

::: code-group

```shell [npm]
npm i eslint typescript @ntnyq/eslint-config -D
```

```shell [pnpm]
pnpm add eslint typescript @ntnyq/eslint-config -D
```

```shell [yarn]
yarn add eslint typescript @ntnyq/eslint-config -D
```

```shell [bun]
bun add eslint typescript @ntnyq/eslint-config -D
```

:::

Create `eslint.config.mjs`:

```js
// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig()
```

Add lint scripts:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

That's it! 🎉

## What's Included?

- **JavaScript & TypeScript**: Full support with strict typing rules
- **Vue 3**: SFC linting with composition API support
- **Frameworks**: Astro, Svelte (opt-in)
- **Data Formats**: JSON, JSONC, YAML, TOML
- **Markdown**: Lint code blocks and prose
- **SVG**: SVGO optimization rules
- **Node.js**: Best practices for Node.js projects
- **Tests**: Vitest, Jest support
- **Import/Export**: Smart import sorting and organization

## Resources

- 📖 [Documentation](./guide/)
- ⚙️ [All Configs](./configs/)
- 🔍 [Config Inspector](https://eslint-config-inspector.ntnyq.com)
- ❓ [FAQ](./faq)
- 📦 [npm Package](https://www.npmjs.com/package/@ntnyq/eslint-config)
- 📋 [GitHub Repository](https://github.com/ntnyq/eslint-config)
- 📝 [Changelog](https://github.com/ntnyq/eslint-config/releases)

## Credits

This config is inspired by and built upon amazing work from:

- [@antfu/eslint-config](https://github.com/antfu/eslint-config) by [Anthony Fu](https://github.com/antfu)
- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config) by [三咲智子](https://github.com/sxzz)

## License

[MIT](https://github.com/ntnyq/eslint-config/blob/main/LICENSE) License © 2023-PRESENT [ntnyq](https://github.com/ntnyq)
