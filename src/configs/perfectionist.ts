import {
  PERFECTIONIST_COMMON_RULE_OPTIONS,
  PERFECTIONIST_EXTRA_RULE_OPTIONS,
  PERFECTIONIST_SORT_CLASSES_GROUPS,
  PERFECTIONIST_SORT_EXPORTS_GROUPS,
  PERFECTIONIST_SORT_IMPORTS_GROUPS,
  PERFECTIONIST_SORT_INTERFACES_OR_OBJECT_TYPES_GROUPS,
  PERFECTIONIST_SORT_INTERSECTION_TYPES_OR_UNION_TYPES_GROUPS,
  PERFECTIONIST_SORT_NAMED_EXPORTS_GROUPS,
  PERFECTIONIST_SORT_NAMED_IMPORTS_GROUPS,
  PERFECTIONIST_SORT_OBJECTS_GROUPS,
} from '../constants'
import { pluginPerfectionist } from '../eslint'
import { GLOB_SRC, GLOB_SRC_EXT, GLOB_TYPES } from '../globs'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Option `partitionByComment` type
 *
 * @see {@link https://perfectionist.dev/rules/sort-imports#partitionbycomment}
 */
export type PerfectionistPartitionByComment =
  | boolean
  | string
  | string[]
  | {
      block?: boolean | string | string[]
      line?: boolean | string | string[]
    }

/**
 * Options type of {@link configPerfectionist}
 */
export type ConfigPerfectionistOptions = OptionsOverrides & {
  /**
   * Enable all perfectionist rule
   *
   * Once enabled, all `types`, `enums` and `constants` related options will be ignores
   *
   * @default false
   */
  all?: boolean

  /**
   * Overrides rules for `constants`
   */
  overridesConstantsRules?: TypedConfigItem['rules']

  /**
   * Overrides rules for `enums`
   */
  overridesEnumsRules?: TypedConfigItem['rules']

  /**
   * Overrides rules for `types`
   */
  overridesTypesRules?: TypedConfigItem['rules']

  /**
   * Shared `partitionByComment` option
   *
   * @default ['@pg', '@perfectionist-group']
   */
  partitionByComment?: PerfectionistPartitionByComment

  /**
   * Enable sort `constants`
   *
   * @default true
   */
  sortConstants?: boolean

  /**
   * Enable sort `enums`
   *
   * @default true
   */
  sortEnums?: boolean

  /**
   * Enable sort `types`
   *
   * @default true
   */
  sortTypes?: boolean
}

/**
 * Config for sorting imports, exports, objects and etc
 *
 * @see {@link https://github.com/azat-io/eslint-plugin-perfectionist}
 *
 * @param options - {@link ConfigPerfectionistOptions}
 * @returns ESLint configs
 */
export const configPerfectionist = (
  options: ConfigPerfectionistOptions = {},
): TypedConfigItem[] => {
  const {
    partitionByComment = PERFECTIONIST_EXTRA_RULE_OPTIONS.partitionByComment,
    sortConstants: enableSortConstants = true,
    sortEnums: enableSortEnums = true,
    sortTypes: enableSortTypes = true,
  } = options

  const commonRuleOptions = {
    ...PERFECTIONIST_COMMON_RULE_OPTIONS,
  }
  const commonRuleOptionsWithNewlinesBetween = {
    ...commonRuleOptions,
    newlinesBetween: 'ignore',
  } as const
  const commonRuleOptionsWithPartitionByComment = {
    ...commonRuleOptions,
    partitionByComment,
  } as const
  const commonRuleOptionsWithBoth = {
    ...commonRuleOptionsWithNewlinesBetween,
    ...commonRuleOptionsWithPartitionByComment,
  }

  const commonRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-exports': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
        groups: PERFECTIONIST_SORT_EXPORTS_GROUPS,
        type: 'line-length',
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
        groups: PERFECTIONIST_SORT_IMPORTS_GROUPS,
        internalPattern: ['^~/.+', '^@/.+', '^#.+'],
      },
    ],
    'perfectionist/sort-named-exports': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
        groups: PERFECTIONIST_SORT_NAMED_EXPORTS_GROUPS,
        ignoreAlias: false,
      },
    ],
    'perfectionist/sort-named-imports': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
        groups: PERFECTIONIST_SORT_NAMED_IMPORTS_GROUPS,
        ignoreAlias: false,
      },
    ],
  }
  const sharedRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-enums': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
      },
    ],
  }
  const sortEnumsRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-modules': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
      },
    ],
  }
  const sortTypesRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-heritage-clauses': [
      'error',
      {
        ...commonRuleOptions,
      },
    ],
    'perfectionist/sort-interfaces': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
        groups: PERFECTIONIST_SORT_INTERFACES_OR_OBJECT_TYPES_GROUPS,
      },
    ],
    'perfectionist/sort-intersection-types': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
        groups: PERFECTIONIST_SORT_INTERSECTION_TYPES_OR_UNION_TYPES_GROUPS,
      },
    ],
    'perfectionist/sort-object-types': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
        groups: PERFECTIONIST_SORT_INTERFACES_OR_OBJECT_TYPES_GROUPS,
      },
    ],
    'perfectionist/sort-union-types': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
        groups: PERFECTIONIST_SORT_INTERSECTION_TYPES_OR_UNION_TYPES_GROUPS,
      },
    ],
  }
  const sortConstantsRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-maps': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
      },
    ],
    'perfectionist/sort-objects': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
        groups: PERFECTIONIST_SORT_OBJECTS_GROUPS,
      },
    ],
    'perfectionist/sort-sets': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
      },
    ],
  }
  const extraRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-array-includes': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
        groups: ['literal', 'spread'],
      },
    ],
    'perfectionist/sort-classes': [
      'error',
      {
        ...commonRuleOptionsWithBoth,
        groups: PERFECTIONIST_SORT_CLASSES_GROUPS,
      },
    ],
    'perfectionist/sort-decorators': [
      'error',
      {
        ...commonRuleOptionsWithPartitionByComment,
      },
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        ...commonRuleOptions,
        groups: ['shorthand', 'multiline', 'unknown'],
      },
    ],
    'perfectionist/sort-switch-case': [
      'error',
      {
        ...commonRuleOptions,
      },
    ],
    'perfectionist/sort-variable-declarations': [
      'error',
      {
        ...commonRuleOptionsWithPartitionByComment,
      },
    ],
  }

  const configs: TypedConfigItem[] = [
    {
      name: options.all
        ? 'ntnyq/perfectionist/all'
        : 'ntnyq/perfectionist/common',
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        ...commonRules,

        ...(options.all
          ? {
              ...sharedRules,
              ...sortEnumsRules,
              ...sortTypesRules,
              ...sortConstantsRules,
              ...extraRules,
            }
          : {}),

        // Overrides rules
        ...options.overrides,
      },
    },
  ]

  // return in advanced, ignore other options
  if (options.all) {
    return configs
  }

  if (enableSortEnums) {
    configs.push({
      name: 'ntnyq/perfectionist/enums',
      files: [`**/enums/${GLOB_SRC}`, `**/enums.${GLOB_SRC_EXT}`],
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        ...sharedRules,

        ...sortEnumsRules,

        // Overrides rules
        ...options.overridesEnumsRules,
      },
    })
  }

  if (enableSortTypes) {
    configs.push({
      name: 'ntnyq/perfectionist/types',
      files: [...GLOB_TYPES],
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        ...sharedRules,

        ...sortTypesRules,

        // Overrides rules
        ...options.overridesTypesRules,
      },
    })
  }

  if (enableSortConstants) {
    configs.push({
      name: 'ntnyq/perfectionist/constants',
      files: [`**/constants/${GLOB_SRC}`, `**/constants.${GLOB_SRC_EXT}`],
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        ...sharedRules,

        ...sortConstantsRules,

        // Overrides rules
        ...options.overridesConstantsRules,
      },
    })
  }

  return configs
}
