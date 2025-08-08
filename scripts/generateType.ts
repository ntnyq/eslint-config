import { writeFile } from 'node:fs/promises'
import { consola } from 'consola'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import {
  configAntfu,
  configAstro,
  configCommand,
  configDeMorgan,
  configDepend,
  configESLintComments,
  configESLintPlugin,
  configFormat,
  configGitHubAction,
  configGitIgnore,
  configHtml,
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
  configPnpm,
  configPrettier,
  configRegexp,
  configSort,
  configSpecials,
  configSvelte,
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
  configAstro(),
  configCommand(),
  configDeMorgan(),
  configESLintComments(),
  configDepend(),
  configESLintPlugin(),
  configFormat(),
  configGitHubAction(),
  configGitIgnore(),
  configHtml(),
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
  configPnpm(),
  configPrettier(),
  configPerfectionist(),
  configRegexp(),
  configSort(),
  configSpecials(),
  configSvelte(),
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

export async function generateTypes() {
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
}

try {
  await generateTypes()
  consola.success('Types generated successfully')
} catch (err) {
  consola.error(err)
}
