import { pluginShell } from '../eslint'
import { GLOB_SHELL } from '../globs'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configShell}
 */
export interface ConfigShellOptions extends OptionsFiles, OptionsOverrides {
  /**
   * Glob patterns shared with the factory's default ignores for JavaScript rules
   */
  files?: string[]

  /**
   * Shell dialect used to parse matching files
   * @default 'bash'
   */
  language?: keyof typeof pluginShell.languages
}

/**
 * Config for shell scripts
 *
 * @see {@link https://github.com/eslint/shell}
 *
 * @param options - {@link ConfigShellOptions}
 * @returns ESLint configs
 */
export const configShell = (
  options: ConfigShellOptions = {},
): TypedConfigItem[] => {
  const { files = [GLOB_SHELL], language = 'bash' } = options

  return [
    {
      name: 'ntnyq/shell',
      files,
      plugins: {
        shell: pluginShell,
      },
      language: `shell/${language}`,
      rules: {
        'shell/no-expansions-in-single-quotes': 'warn',
        'shell/no-backticks': 'error',
        'shell/no-ls-iteration': 'error',
        'shell/no-unquoted-expansions': 'error',
        'shell/no-unused-vars': 'error',
        'shell/no-useless-cat': 'error',
        'shell/no-useless-echo': 'error',
        'shell/no-variables-in-printf-format': 'error',
        'shell/require-cd-guard': 'error',
        'shell/require-read-r': 'error',

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
