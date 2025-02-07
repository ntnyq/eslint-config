declare module 'eslint-plugin-eslint-plugin' {
  import type { Linter, Rule } from 'eslint'
  declare const plugin: {
    rules: Record<string, Rule.RuleModule>
    configs: {
      'flat/all': Linter.Config
      'flat/recommended': Linter.Config
      'flat/rules': Linter.Config
      'flat/rules-recommended': Linter.Config
      'flat/tests': Linter.Config
      'flat/tests-recommended': Linter.Config
    }
  }
  export = plugin
}
