import type { TypedConfigItem } from './eslint'

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
  files?: string[]
}

/**
 * Options for overrides `rules`
 */
export interface OptionsOverrides<
  Rules extends TypedConfigItem['rules'] = TypedConfigItem['rules'],
> {
  overrides?: Rules
}
