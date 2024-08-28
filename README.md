# eslint-config

> Flat ESLint config for JavaScript, TypeScript, Vue 2, Vue 3, Prettier.

[![CI](https://github.com/ntnyq/eslint-config/workflows/CI/badge.svg)](https://github.com/ntnyq/eslint-config/actions)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/@ntnyq/eslint-config)](https://www.npmjs.com/package/@ntnyq/eslint-config)
[![NPM VERSION](https://img.shields.io/npm/v/@ntnyq/eslint-config/latest.svg)](https://www.npmjs.com/package/@ntnyq/eslint-config/v/latest)

## Install

```bash
pnpm add eslint prettier typescript @ntnyq/eslint-config @ntnyq/prettier-config -D
```

## Usage

Config in `eslint.config.{mjs,mts}`:

```js
import { ntnyq } from '@ntnyq/eslint-config'

export default ntnyq()
```

Config in `eslint.config.{cjs,cts}`

```js
const ntnyq = require('@ntnyq/eslint-config')

module.exports = ntnyq()
```

## VSCode Config

```json
{
  "eslint.enable": true,
  "prettier.enable": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "vue",
    "html",
    "yaml",
    "toml",
    "json",
    "jsonc",
    "json5",
    "markdown",
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ]
}
```

## Credits

- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## License

[MIT](./LICENSE) License © 2023-PRESENT [ntnyq](https://github.com/ntnyq)
