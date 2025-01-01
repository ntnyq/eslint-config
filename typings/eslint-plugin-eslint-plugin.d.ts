declare module 'eslint-plugin-eslint-plugin' {
  import type { ESLint, Linter } from 'eslint'
  declare const plugin: {
    rules: NonNullable<ESLint.Plugin['rules']>
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
