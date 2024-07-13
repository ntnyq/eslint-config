import { writeFile } from 'node:fs/promises'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import {
  command,
  comments,
  defineConfig,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  jsx,
  markdown,
  node,
  prettier,
  regexp,
  sortPackageJson,
  sortTsConfig,
  toml,
  typescript,
  unicorn,
  unocss,
  vue,
  yml,
} from '../src'

const configs = defineConfig([
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  ...command,
  ...comments,
  ...ignores,
  ...imports,
  ...javascript,
  ...jsdoc,
  ...jsonc,
  ...jsx,
  ...markdown,
  ...node,
  ...prettier,
  ...regexp,
  ...sortPackageJson,
  ...sortTsConfig,
  ...typescript,
  ...unicorn,
  ...unocss,
  ...vue,
  ...yml,
  ...toml,
])

const configNames = configs.map(i => i.name).filter(Boolean)

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigName = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await writeFile(`src/types/typegen.d.ts`, dts)