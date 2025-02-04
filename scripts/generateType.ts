import { writeFile } from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import {
  configAntfu,
  configCommand,
  configComments,
  configDepend,
  configESLintPlugin,
  configEsX,
  configFormat,
  configGitHubAction,
  configGitIgnore,
  configIgnores,
  configImportX,
  configJavaScript,
  configJsdoc,
  configJsonc,
  configJSX,
  configMarkdown,
  configNode,
  configNtnyq,
  configPerfectionist,
  configPinia,
  configPrettier,
  configRegexp,
  configSort,
  configSpecials,
  configSVGO,
  configToml,
  configTypeScript,
  configUnicorn,
  configUnoCSS,
  configUnusedImports,
  configVitest,
  configVue,
  configYml,
} from '../src/configs'
import { combineConfigs } from '../src/utils'

/**
 * Sorted alphabetically
 */
const configs = await combineConfigs(
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  configAntfu(),
  configCommand(),
  configComments(),
  configDepend(),
  configESLintPlugin(),
  configEsX(),
  configFormat(),
  configGitHubAction(),
  configGitIgnore(),
  configIgnores(),
  configImportX(),
  configJavaScript(),
  configJsdoc(),
  configJsonc(),
  configJSX(),
  configMarkdown(),
  configNode(),
  configNtnyq(),
  configPinia(),
  configPrettier(),
  configPerfectionist(),
  configRegexp(),
  configSort(),
  configSpecials(),
  configSVGO(),
  configToml(),
  configTypeScript(),
  configUnusedImports(),
  configUnicorn(),
  configUnoCSS(),
  configVitest(),
  configVue(),
  configYml(),
)

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await writeFile(`src/types/typegen.ts`, dts)
