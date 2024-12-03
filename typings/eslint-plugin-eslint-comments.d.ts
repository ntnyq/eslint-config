declare module '@eslint-community/eslint-plugin-eslint-comments' {
  import type { ESLint, Linter } from 'eslint'
  declare const plugin: {
    rules: NonNullable<ESLint.Plugin['rules']>
    configs: {
      recommended: Linter.Config
    }
  }
  export = plugin
}
