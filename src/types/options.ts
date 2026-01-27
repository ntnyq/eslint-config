import type { Linter } from 'eslint'
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
 * Options for formatter configs
 */
export interface OptionsFormatter {
  /**
   * Whether using formatter config
   */
  usingFormatter?: boolean
}

/**
 * Options for shareable cross plugins
 */
export interface OptionsShareable {
  /**
   * The ECMAScript version of the code being linted
   * @default 'latest'
   */
  ecmaVersion?: Linter.EcmaVersion

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
