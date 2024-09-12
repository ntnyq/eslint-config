import { writeFile } from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import {
  antfu,
  command,
  comments,
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
