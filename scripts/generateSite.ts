import { $ } from 'zx'

await $`
  pnpm run build
`
await $`
  pnpm dlx @eslint/config-inspector build
`
