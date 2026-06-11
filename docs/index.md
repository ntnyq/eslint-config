---
layout: home

hero:
  name: ESLint Config
  text: Opinionated ESLint preset for frontend teams
  tagline: Flat config, practical defaults, TypeScript and Vue ready
  image:
    light: /logo.svg
    dark: /logo.svg
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: Config Matrix
      link: /configs/
    - theme: alt
      text: Inspector
      link: https://eslint-config-inspector.ntnyq.com
      target: _blank

features:
  - icon: ⚡️
    title: Fast Start
    details: Install, add eslint.config.mjs, run lint. Works in minutes.

  - icon: 🧩
    title: Modular Preset
    details: Keep defaults, disable noisy modules, or enable optional stacks like Astro and SVGO.

  - icon: 🧠
    title: Smart Detection
    details: Automatically turns on configs by dependencies and file types.

  - icon: 🛠️
    title: Frontend Coverage
    details: TypeScript, Vue SFC, JSON, Markdown, YAML, TOML, and test files.

  - icon: 🎨
    title: Formatter Friendly
    details: Works with either Prettier or oxfmt for clean and predictable workflows.

  - icon: 🏢
    title: Monorepo Ready
    details: Add folder-based overrides for apps and packages in a single root config.
---

## Quick Start

::: code-group

```shell [pnpm]
pnpm add -D eslint typescript @ntnyq/eslint-config
```

```shell [npm]
npm i -D eslint typescript @ntnyq/eslint-config
```

```shell [yarn]
yarn add -D eslint typescript @ntnyq/eslint-config
```

```shell [bun]
bun add -D eslint typescript @ntnyq/eslint-config
```

:::

Create `eslint.config.mjs`:

```js
// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig()
```

Add scripts:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Recommended Reading Path

1. [Guide](/guide/): install, quick start, and first customizations.
2. [Configs](/configs/): find which modules are auto, default-on, or optional.
3. [Custom Configuration](/guide/custom): monorepo and advanced override patterns.
4. [FAQ](/faq): performance, VS Code, and troubleshooting.

## Useful Links

- [Config Inspector](https://eslint-config-inspector.ntnyq.com/)
- [npm package](https://www.npmjs.com/package/@ntnyq/eslint-config)
- [GitHub repository](https://github.com/ntnyq/eslint-config)
- [Release notes](https://github.com/ntnyq/eslint-config/releases)

## Credits

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)
