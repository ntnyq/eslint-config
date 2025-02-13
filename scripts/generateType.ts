import { writeFile } from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import {
  configAntfu,
  configCommand,
  configDeMorgan,
  configDepend,
  configESLintComments,
  configESLintPlugin,
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
  configTest,
  configToml,
  configTypeScript,
  configUnicorn,
  configUnoCSS,
  configUnusedImports,
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
  configDeMorgan(),
  configESLintComments(),
  configDepend(),
  configESLintPlugin(),
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
  configTest(),
  configToml(),
  configTypeScript(),
  configUnusedImports(),
  configUnicorn(),
  configUnoCSS(),
  configVue(),
  configYml(),
)

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

const dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

await writeFile(
  'src/types/typegen.d.ts',
  [
    '// cSpell: disable',
    dts,
    `// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`,
  ].join('\n'),
)
