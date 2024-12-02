import { createRecommendedConfig } from 'eslint-plugin-github-action'
import { GLOB_GITHUB_ACTION } from '../globs'
import type { ConfigGitHubActionOptions, TypedConfigItem } from '../types'

export const githubAction = (options: ConfigGitHubActionOptions = {}): TypedConfigItem[] => {
  const {
    // Support common overrides rules
    overrides: overridesRules = {},

    // Flat config options
    ...restOptions
  } = options

  const recommendedConfig = createRecommendedConfig({
    name: 'ntnyq/github-action',
    files: [GLOB_GITHUB_ACTION],
    ...restOptions,
  })
  return [
    {
      ...recommendedConfig,
      rules: {
        ...recommendedConfig.rules,

        // Overrides rules
        ...overridesRules,
      },
    },
  ]
}
