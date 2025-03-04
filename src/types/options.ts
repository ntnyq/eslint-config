import type { ESLintConfig, TypedConfigItem } from './eslint'

/**
 * Options for overrides `files`
 */
export interface OptionsFiles {
  files?: ESLintConfig['files']
}

/**
 * Options for overrides ignores for specific config
 */
export interface OptionsIgnores {
  ignores?: ESLintConfig['ignores']
}

/**
 * Options for overrides `rules`
 */
export interface OptionsOverrides<
  Rules extends TypedConfigItem['rules'] = TypedConfigItem['rules'],
> {
  overrides?: Rules
}

/**
 * Options for shareable cross plugins
 */
export interface OptionsShareable {
  /**
   * @see {@link https://typescript-eslint.io/packages/parser/#extrafileextensions}
   */
  extraFileExtensions?: string[]

  /**
   * Enable typescript support
   * @default false
   */
  typescript?: boolean
}
