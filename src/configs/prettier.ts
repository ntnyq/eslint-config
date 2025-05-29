import { pluginPrettier } from '../eslint'
import { GLOB_ASTRO, GLOB_SVELTE, GLOB_SVG, GLOB_TOML } from '../globs'
import type {
  ESLintRuleSeverity,
  OptionsOverrides,
  TypedConfigItem,
} from '../types'

/**
 * Options type of {@link configPrettier}
 */
export interface ConfigPrettierOptions extends OptionsOverrides {
  /**
   * Glob of built-in disabled files
   *
   * @default all svg, toml, svelte and astro files
   */
  disabledFiles?: string[]

  /**
   * rule severity
   *
   * @default `warn`
   */
  severity?: ESLintRuleSeverity

  /**
   * Glob of user custom disabled files
   *
   * @default []
   */
  userDisabledFiles?: string[]
}

/**
 * Config for using prettier
 *
 * @see {@link https://github.com/prettier/eslint-plugin-prettier}
 *
 * @param options - {@link ConfigPrettierOptions}
 * @returns ESLint configs
 */
export const configPrettier = (
  options: ConfigPrettierOptions = {},
): TypedConfigItem[] => {
  const {
    disabledFiles = [GLOB_SVG, GLOB_TOML, GLOB_ASTRO, GLOB_SVELTE],
    // User defined disabled files
    userDisabledFiles = [],
  } = options

  return [
    {
      name: 'ntnyq/prettier',
      plugins: {
        prettier: pluginPrettier,
      },
      rules: {
        'vue/array-bracket-newline': 'off',
        'vue/array-bracket-spacing': 'off',
        'vue/array-element-newline': 'off',
        'vue/arrow-spacing': 'off',
        'vue/block-spacing': 'off',
        'vue/block-tag-newline': 'off',
        'vue/brace-style': 'off',
        'vue/comma-dangle': 'off',
        'vue/comma-spacing': 'off',
        'vue/comma-style': 'off',
        'vue/dot-location': 'off',
        'vue/func-call-spacing': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'vue/html-end-tags': 'off',
        'vue/html-indent': 'off',
        'vue/html-quotes': 'off',
        'vue/key-spacing': 'off',
        'vue/keyword-spacing': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/multiline-ternary': 'off',
        'vue/mustache-interpolation-spacing': 'off',
        'vue/no-extra-parens': 'off',
        'vue/no-multi-spaces': 'off',
        'vue/no-spaces-around-equal-signs-in-attribute': 'off',
        'vue/object-curly-newline': 'off',
        'vue/object-curly-spacing': 'off',
        'vue/object-property-newline': 'off',
        'vue/operator-linebreak': 'off',
        'vue/quote-props': 'off',
        'vue/script-indent': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/space-in-parens': 'off',
        'vue/space-infix-ops': 'off',
        'vue/space-unary-ops': 'off',
        'vue/template-curly-spacing': 'off',
        /**
         * @pg
         * @see {@link https://github.com/prettier/eslint-plugin-prettier/blob/cd48a275f130e515f23cebdf7c6cb588b041cd64/eslint-plugin-prettier.js#L101-L103}
         */
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        'prettier/prettier': options.severity || 'warn',
        // Overrides rules
        ...options.overrides,
      },
    },

    /**
     * Languages that prettier currently does not support
     */
    {
      name: 'ntnyq/prettier/disabled',
      files: [...disabledFiles, ...userDisabledFiles],
      plugins: {
        prettier: pluginPrettier,
      },
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ]
}
