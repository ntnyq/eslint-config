declare module 'eslint-plugin-no-only-tests' {
  import type { Rule } from 'eslint'
  declare const plugin: {
    rules: {
      'no-only-tests': Rule.RuleModule
    }
  }
  export = plugin
}
