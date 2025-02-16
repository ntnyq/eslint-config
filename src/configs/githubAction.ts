import { createConfig } from 'eslint-plugin-github-action'
import { GLOB_GITHUB_ACTION } from '../globs'
import type { CreateConfigOptions as GitHubActionOptions } from 'eslint-plugin-github-action'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configGitHubAction}
 */
export type ConfigGitHubActionOptions = GitHubActionOptions & OptionsOverrides

/**
 * Config for github action files
 *
 * @see {@link https://github.com/ntnyq/eslint-plugin-github-action}
 *
 * @param options - {@link ConfigGitHubActionOptions}
 * @returns ESLint configs
 */
export const configGitHubAction = (
  options: ConfigGitHubActionOptions = {},
): TypedConfigItem[] => {
  const {
    files = [GLOB_GITHUB_ACTION],
    rules = {},

    overrides: overridesRules = {},
    ...restOptions
  } = options

  return [
    createConfig({
      name: 'ntnyq/github-action',
      files,
      rules: {
        'github-action/no-invalid-key': 'error',
        'github-action/prefer-file-extension': 'error',
        'github-action/require-action-name': 'error',

        ...rules,
        ...overridesRules,
      },
      ...restOptions,
    }),
  ]
}
