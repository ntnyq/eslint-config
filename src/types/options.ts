import type { ESLintConfig, TypedConfigItem } from './eslint'

/**
 * Options for add `extensions` support
 */
export interface OptionsExtensions {
  extensions?: string[]
}

/**
 * Options for add `features` support
 */
export type OptionsFeatures = {
  /**
   * Enable typescript support
   */
  typescript?: boolean
}

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
