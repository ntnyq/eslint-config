import { pluginGitHubAction } from '../eslint'
import { GLOB_GITHUB_ACTION } from '../globs'
import type { ConfigGitHubActionOptions, TypedConfigItem } from '../types'

export const githubAction = (options: ConfigGitHubActionOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/github-action',
    files: [GLOB_GITHUB_ACTION],
    plugins: {
      'github-action': pluginGitHubAction,
    },
    rules: {
      'github-action/require-action-name': 'error',

      // Overrides rules
      ...options.overrides,
    },
  },
]
