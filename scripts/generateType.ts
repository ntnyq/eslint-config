import { writeFile } from 'node:fs/promises'
import { consola } from 'consola'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { defineESLintConfig } from '../src/core'

const configs = await defineESLintConfig({
  astro: true,
  eslintPlugin: true,
  html: true,
  pnpm: true,
  svelte: true,
  svgo: true,
  test: true,
  unocss: true,
  pinia: true,
  vue: true,
  specials: {
    shadcnVue: true,
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
}).prepend({
  plugins: {
    '': {
      rules: Object.fromEntries(builtinRules.entries()),
    },
  },
})

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
