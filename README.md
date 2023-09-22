# eslint-config

> Flat ESLint config for JavaScript, TypeScript, Vue 2, Vue 3, Prettier.

[![CI](https://github.com/ntnyq/eslint-config/workflows/CI/badge.svg)](https://github.com/ntnyq/eslint-config/actions)
[![NPM VERSION](https://img.shields.io/npm/v/@ntnyq/eslint-config/next.svg)](https://www.npmjs.com/package/@ntnyq/eslint-config/v/next)

## Install

```bash
pnpm add @ntnyq/eslint-config@next eslint-define-config -D
```

## Usage

Config in `eslint.config.js`:

```js
import { defineFlatConfig } from 'eslint-define-config'
import { all } from '@ntnyq/eslint-config'

export default defineFlatConfig(all)
```

Make sure to config `"eslint.experimental.useFlatConfig": true` in `.vscode/settings.json`

## Credits

- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## License

[MIT](./LICENSE) License © 2023-PRESENT [ntnyq](https://github.com/ntnyq)
