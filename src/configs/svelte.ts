import { parserTypeScript } from '../eslint'
import { GLOB_SVELTE } from '../globs'
import { ensurePackages, interopDefault } from '../utils'
import type {
  OptionsFiles,
  OptionsOverrides,
  OptionsShareable,
  TypedConfigItem,
} from '../types'

/**
 * Options type of {@link configSvelte}
 */
export type ConfigSvelteOptions = OptionsFiles
  & OptionsOverrides
  & OptionsShareable

/**
 * Config for svelte files
 *
 * @see {@link https://github.com/ota-meshi/eslint-plugin-svelte}
 *
 * @param options - {@link ConfigSvelteOptions}
 * @returns ESLint configs
 */
export const configSvelte = async (
  options: ConfigSvelteOptions = {},
): Promise<TypedConfigItem[]> => {
  await ensurePackages(['svelte-eslint-parser', 'eslint-plugin-svelte'])

  const [parserSvelte, pluginSvelte] = await Promise.all([
    interopDefault(import('svelte-eslint-parser')),
    interopDefault(import('eslint-plugin-svelte')),
  ])

  const { files = [GLOB_SVELTE], extraFileExtensions = [] } = options
  return [
    {
      name: 'ntnyq/svelte',
      files,
      plugins: {
        svelte: pluginSvelte,
      },
      processor: pluginSvelte.processors['.svelte'],
      languageOptions: {
        parser: parserSvelte,
        sourceType: 'module',
        parserOptions: {
          extraFileExtensions,
          parser: parserTypeScript,
        },
      },
      rules: {
        'import-x/no-mutable-exports': 'off',
        // incompatible with most recent (attribute-form) generic types RFC
        'no-undef': 'off',
        'no-unused-vars': [
          'error',
          {
            args: 'none',
            caughtErrors: 'none',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^(\\$\\$Props$|\\$\\$Events$|\\$\\$Slots$)',
          },
        ],
        'svelte/comment-directive': 'error',
        'svelte/derived-has-same-inputs-outputs': 'error',
        'svelte/html-closing-bracket-spacing': 'error',
        'svelte/html-quotes': [
          'error',
          {
            prefer: 'double',
            dynamic: {
              avoidInvalidUnquotedInHTML: false,
              quoted: true,
            },
          },
        ],
        'svelte/indent': [
          'error',
          {
            alignAttributesVertically: true,
            indent: 2,
            indentScript: false,
          },
        ],
        'svelte/mustache-spacing': [
          'error',
          {
            attributesAndProps: 'never',
            directiveExpressions: 'always',
            textExpressions: 'always',
            tags: {
              closingBrace: 'always',
              openingBrace: 'always',
            },
          },
        ],
        'svelte/no-at-debug-tags': 'error',
        'svelte/no-at-html-tags': 'error',
        'svelte/no-dupe-else-if-blocks': 'error',
        'svelte/no-dupe-style-properties': 'error',
        'svelte/no-dupe-use-directives': 'error',
        'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
        'svelte/no-inner-declarations': 'error',
        'svelte/no-not-function-handler': 'error',
        'svelte/no-object-in-text-mustaches': 'error',
        'svelte/no-reactive-functions': 'error',
        'svelte/no-reactive-literals': 'error',
        'svelte/no-shorthand-style-property-overrides': 'error',
        'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
        'svelte/no-trailing-spaces': 'error',
        'svelte/no-unknown-style-directive-property': 'error',
        'svelte/no-unused-svelte-ignore': 'error',
        'svelte/no-useless-mustaches': 'error',
        'svelte/require-store-callbacks-use-set-param': 'error',
        'svelte/spaced-html-comment': 'error',
        'svelte/system': 'error',
        'svelte/valid-each-key': 'error',

        ...options.overrides,
      },
    },
  ]
}
