/**
 * Shared perfectionist plugin settings
 */
const pluginSettings = {
  fallbackSort: { order: 'asc', type: 'alphabetical' },
  ignoreCase: true,
  order: 'asc',
  partitionByNewLine: false,
  specialCharacters: 'keep',
  type: 'alphabetical',
} as const

/**
 * Shared perfectionist rule options for some rules
 */
const partialRuleOptions = {
  newlinesBetween: 'ignore',
  partitionByComment: ['@pg', '@perfectionist-group'] as string[],
} as const

/**
 * Shared option `groups` for rule `sort-objects`
 *
 * @see {@link https://perfectionist.dev/rules/sort-objects}
 */
const sortObjectsGroups: string[] = [
  'property',
  'multiline-property',
  'method',
  'multiline-method',
  'unknown',
]

/**
 * Shared option `groups` for rules
 * - `sort-interfaces`
 * - `sort-object-types`
 *
 * @see {@link https://perfectionist.dev/rules/sort-interfaces}
 * @see {@link https://perfectionist.dev/rules/sort-object-types}
 */
const sortInterfacesOrObjectTypesGroups: string[] = [
  'required-property',
  'optional-property',
  'required-method',
  'optional-method',
  'required-multiline-property',
  'optional-multiline-property',
  'required-multiline-method',
  'optional-multiline-method',
  'unknown',
  'index-signature',
  'multiline-index-signature',
]

/**
 * Shared option `groups` for rules:
 * - `sort-intersection-types`
 * - `sort-union-types`
 *
 * Philosophy: keep simple thing first except null & undefined
 *
 * @see {@link https://perfectionist.dev/rules/sort-intersection-types}
 * @see {@link https://perfectionist.dev/rules/sort-union-types}
 */
const sortIntersectionTypesOrUnionTypesGroups: string[] = [
  /**
   * eg. 'foobar', 24, false
   */
  'literal',

  /**
   * eg. number, string
   */
  'keyword',

  /**
   * eg. FooBar
   */
  'named',

  /**
   * eg. Foo & Bar
   */
  'intersection',

  /**
   * eg. Foobar extends string ? Foo : Bar
   */
  'conditional',

  /**
   * eg. (...args: any[]) => void
   */
  'function',

  /**
   * eg. import('eslint').Linter
   */
  'import',

  /**
   * eg. { foo: string; bar: number; }
   */
  'object',

  /**
   * eg. keyof T
   */
  'operator',

  /**
   * eg. [string, number]
   */
  'tuple',

  /**
   * eg. Foo | Bar
   */
  'union',

  /**
   * eg. null | undefined
   */
  'nullish',
]

/**
 * Shared option `groups` for rule `sort-imports`
 *
 * @see {@link https://perfectionist.dev/rules/sort-imports}
 */
const sortImportsTypes: string[] = [
  // Side effect style imports (e.g. 'normalize.css')
  'side-effect-style',

  // Styles (e.g. *.{css,scss,less})
  'value-style',

  // Node.js built-in modules. (e.g. fs, path)
  'value-builtin',

  // External modules installed in the project (e.g. vue, lodash)
  'value-external',

  // Node.js subpath imports (e.g. fs/promises)
  'value-subpath',

  // Internal modules (e.g. @/utils, @/components)
  'value-internal',

  // Modules from parent directory (e.g. ../utils)
  'value-parent',

  // Modules from the same directory (e.g. ./utils)
  'value-sibling',

  // Main file from the current directory (e.g. ./index)
  'value-index',

  // TypeScript import-equals imports (e.g. import log = console.log)
  'ts-equals-import',

  // Side effect imports (e.g. import 'babel-polyfill')
  'side-effect',

  /**
   * Type import at the end
   */
  'type-builtin',
  'type-external',
  'type-subpath',
  'type-internal',
  'type-parent',
  'type-sibling',
  'type-index',

  /**
   * Imports that don’t fit into any other groups
   */
  'unknown',
]

/**
 * Shared option `groups` for rule `sort-exports`
 *
 * @see {@link https://perfectionist.dev/rules/sort-exports}
 */
const sortExportsGroups: string[] = ['value-export', 'type-export', 'unknown']

/**
 * Shared option `groups` for rule `sort-named-exports`
 *
 * @see {@link https://perfectionist.dev/rules/sort-named-exports}
 */
const sortNamedExportsGroups: string[] = [
  'value-export',
  'type-export',
  'unknown',
]

/**
 * Shared option `groups` for rule `sort-named-imports`
 *
 * @see {@link https://perfectionist.dev/rules/sort-named-imports}
 */
const sortNamedImportsGroups: string[] = [
  'value-import',
  'type-import',
  'unknown',
]

/**
 * Shared option `groups` for rule `sort-classes`
 *
 * // TODO: implement this
 *
 * @see {@link https://perfectionist.dev/rules/sort-classes}
 */
const sortClassesGroups: string[] = ['unknown']

/**
 * Shared constants about eslint-plugin-perfectionist
 */
export const PERFECTIONIST = Object.freeze({
  partialRuleOptions,
  pluginSettings,
  sortClassesGroups,
  sortExportsGroups,
  sortImportsTypes,
  sortInterfacesOrObjectTypesGroups,
  sortIntersectionTypesOrUnionTypesGroups,
  sortNamedExportsGroups,
  sortNamedImportsGroups,
  sortObjectsGroups,
})
