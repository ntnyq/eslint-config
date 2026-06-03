declare module 'eslint-plugin-no-only-tests' {
  import type { Rule } from 'eslint'
  const plugin: {
    rules: {
      'no-only-tests': Rule.RuleModule
    }
  }
  export = plugin
}
