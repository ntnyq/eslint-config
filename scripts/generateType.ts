import { writeFile } from 'node:fs/promises'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import {
  antfu,
  command,
  comments,
  createConfigNtnyq,
  gitignore,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  jsx,
  markdown,
  node,
  perfectionist,
  prettier,
  regexp,
  sortPackageJson,
  sortTsConfig,
  toml,
  typescript,
  unicorn,
  unocss,
  unusedImports,
  // vitest,
  vue,
  yml,
} from '../src/configs'

const configs = [
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  ...antfu(),
  ...command(),
  ...comments(),
  ...ignores(),
  ...imports(),
  ...gitignore(),
  ...javascript(),
  ...jsdoc(),
  ...jsonc(),
  ...jsx(),
  ...markdown(),
  ...node(),
  ...createConfigNtnyq(),
  ...prettier(),
  ...regexp(),
  ...perfectionist(),
  ...sortPackageJson(),
  ...sortTsConfig(),
  ...typescript(),
  ...unusedImports(),
  ...unicorn(),
  ...unocss(),
  ...vue(),
  // ...vitest(),
  ...yml(),
  ...toml(),
]

const configNames = configs.map(i => i.name).filter(Boolean)

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await writeFile(`src/types/typegen.ts`, dts)
