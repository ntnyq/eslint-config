import { parserYaml, pluginGitHubAction } from '../eslint'
import { GLOB_GITHUB_ACTION } from '../globs'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configGitHubAction}
 */
export type ConfigGitHubActionOptions = OptionsFiles & OptionsOverrides

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
    //
    files = [GLOB_GITHUB_ACTION],
    overrides: overridesRules = {},
  } = options

  return [
    {
      name: 'ntnyq/github-action',
      files,
      plugins: {
        'github-action': pluginGitHubAction,
      },
      languageOptions: {
        parser: parserYaml,
      },
      rules: {
        'github-action/no-invalid-key': 'error',
        'github-action/prefer-file-extension': 'error',
        'github-action/require-action-name': 'error',

        ...overridesRules,
      },
    },
  ]
}
