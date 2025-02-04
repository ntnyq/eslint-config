import { createConfig } from 'eslint-plugin-github-action'
import { GLOB_GITHUB_ACTION } from '../globs'
import type { ConfigGitHubActionOptions, TypedConfigItem } from '../types'

export const configGitHubAction = (options: ConfigGitHubActionOptions = {}): TypedConfigItem[] => {
  const {
    // Support common overrides rules
    overrides: overridesRules = {},

    // Config options
    ...restOptions
  } = options

  return [
    createConfig({
      name: 'ntnyq/github-action',
      files: [GLOB_GITHUB_ACTION],
      rules: {
        'github-action/no-invalid-key': 'error',
        'github-action/prefer-file-extension': 'error',
        'github-action/require-action-name': 'error',

        ...overridesRules,
      },
      ...restOptions,
    }),
  ]
}
