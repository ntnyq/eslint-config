declare module '@eslint-community/eslint-plugin-eslint-comments' {
  import type { ESLint, Linter } from 'eslint'
  declare const plugin: {
    configs: {
      recommended: Linter.Config
    }
    rules: NonNullable<ESLint.Plugin['rules']>
  }
  export = plugin
}
