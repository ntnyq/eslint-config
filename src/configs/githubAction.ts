import { pluginGitHubAction } from '../eslint'
import type { ConfigGitHubActionOptions, TypedConfigItem } from '../types'

export const githubAction = (options: ConfigGitHubActionOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/github-action',
    plugins: {
      'github-action': pluginGitHubAction,
    },
    rules: {
      ...(pluginGitHubAction.configs?.recommended as TypedConfigItem).rules,

      // Overrides rules
      ...options.overrides,
    },
  },
]
