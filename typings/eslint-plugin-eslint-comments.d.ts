declare module '@eslint-community/eslint-plugin-eslint-comments' {
  import type { Linter, Rule } from 'eslint'
  declare const plugin: {
    rules: Record<string, Rule.RuleModule>
    configs: {
      recommended: Linter.Config
    }
  }
  export = plugin
}
