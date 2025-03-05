/**
 * TODO: delete this when new version released
 */
declare module 'eslint-plugin-vue' {
  import type { ESLint, Linter, Rule } from 'eslint'

  type LegacyConfigNames =
    | 'base'
    | 'essential'
    | 'no-layout-rules'
    | 'recommended'
    | 'strongly-recommended'
    | 'vue2-essential'
    | 'vue2-recommended'
    | 'vue2-strongly-recommended'

  type FlatConfigNames =
    | 'flat/base'
    | 'flat/essential'
    | 'flat/recommended'
    | 'flat/strongly-recommended'
    | 'flat/vue2-essential'
    | 'flat/vue2-recommended'
    | 'flat/vue2-strongly-recommended'

  declare const plugin: {
    meta: ESLint.Plugin['meta']
    rules: Record<string, Rule.RuleModule>
    configs: {
      [Name in FlatConfigNames]: Linter.Config
    } & {
      [Name in LegacyConfigNames]: Linter.LegacyConfig
    }
    processors: {
      '.vue': Linter.Processor
      vue: Linter.Processor
    }
  }
  export = plugin
}
