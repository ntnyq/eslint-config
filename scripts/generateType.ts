import { writeFile } from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import {
  antfu,
  command,
  comments,
  esX,
  format,
  githubAction,
  gitignore,
  ignores,
  importX,
  javascript,
  jsdoc,
  jsonc,
  jsx,
  markdown,
  node,
  ntnyq,
  perfectionist,
  pinia,
  prettier,
  regexp,
  sort,
  specials,
  stylistic,
  toml,
  typescript,
  unicorn,
  unocss,
  unusedImports,
  vitest,
  vue,
  yml,
} from '../src/configs'

/**
 * Sorted alphabetically
 */
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
  ...esX(),
  ...format(),
  ...githubAction(),
  ...gitignore(),
  ...ignores(),
  ...importX(),
  ...javascript(),
  ...jsdoc(),
  ...jsonc(),
  ...jsx(),
  ...markdown(),
  ...node(),
  ...ntnyq(),
  ...pinia(),
  ...prettier(),
  ...perfectionist(),
  ...regexp(),
  ...sort(),
  ...specials(),
  ...stylistic(),
  ...toml(),
  ...typescript(),
  ...unusedImports(),
  ...unicorn(),
  ...unocss(),
  ...vitest(),
  ...vue(),
  ...yml(),
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
