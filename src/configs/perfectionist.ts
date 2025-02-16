import {
  PERFECTIONIST_COMMON_RULE_OPTIONS,
  PERFECTIONIST_EXTRA_RULE_OPTIONS,
  PERFECTIONIST_SORT_IMPORTS_GROUPS,
  PERFECTIONIST_SORT_INTERFACES_OR_OBJECT_TYPES_GROUPS,
  PERFECTIONIST_SORT_INTERSECTION_TYPES_OR_UNION_TYPES_GROUPS,
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

interface CommonRuleOptions {
  disableNewlinesBetween?: boolean
  disablePartitionByComment?: boolean
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

  function getCommonRuleOptions(options: CommonRuleOptions = {}) {
    const ruleOptions = {
      ...PERFECTIONIST_COMMON_RULE_OPTIONS,
      ...(options.disableNewlinesBetween
        ? {}
        : ({ newlinesBetween: 'ignore' } as const)),
      ...(options.disableNewlinesBetween
        ? {}
        : ({ partitionByComment } as const)),
    }

    return ruleOptions
  }

  const configs: TypedConfigItem[] = [
    {
      name: 'ntnyq/perfectionist/common',
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        'perfectionist/sort-exports': [
          'error',
          {
            ...getCommonRuleOptions({
              disableNewlinesBetween: true,
            }),
            groupKind: 'values-first',
            type: 'line-length',
          },
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            ...getCommonRuleOptions(),
            groups: PERFECTIONIST_SORT_IMPORTS_GROUPS,
            internalPattern: ['^~/.+', '^@/.+', '^#.+'],
          },
        ],
        'perfectionist/sort-named-exports': [
          'error',
          {
            ...getCommonRuleOptions({
              disableNewlinesBetween: true,
            }),
            groupKind: 'values-first',
            ignoreAlias: false,
          },
        ],
        'perfectionist/sort-named-imports': [
          'error',
          {
            ...getCommonRuleOptions({
              disableNewlinesBetween: true,
            }),
            groupKind: 'values-first',
            ignoreAlias: false,
          },
        ],

        // Overrides rules
        ...options.overrides,
      },
    },
  ]

  if (enableSortEnums) {
    configs.push({
      name: 'ntnyq/perfectionist/enums',
      files: [`**/enums/${GLOB_SRC}`, `**/enums.${GLOB_SRC_EXT}`],
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        'perfectionist/sort-enums': [
          'error',
          {
            ...getCommonRuleOptions(),
          },
        ],
        'perfectionist/sort-modules': [
          'error',
          {
            ...getCommonRuleOptions(),
          },
        ],

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
        'perfectionist/sort-heritage-clauses': [
          'error',
          {
            ...getCommonRuleOptions({
              disableNewlinesBetween: true,
              disablePartitionByComment: true,
            }),
          },
        ],
        'perfectionist/sort-interfaces': [
          'error',
          {
            ...getCommonRuleOptions(),
            groups: PERFECTIONIST_SORT_INTERFACES_OR_OBJECT_TYPES_GROUPS,
          },
        ],
        'perfectionist/sort-intersection-types': [
          'error',
          {
            ...getCommonRuleOptions(),
            groups: PERFECTIONIST_SORT_INTERSECTION_TYPES_OR_UNION_TYPES_GROUPS,
          },
        ],
        'perfectionist/sort-modules': [
          'error',
          {
            ...getCommonRuleOptions(),
          },
        ],
        'perfectionist/sort-object-types': [
          'error',
          {
            ...getCommonRuleOptions(),
            groups: PERFECTIONIST_SORT_INTERFACES_OR_OBJECT_TYPES_GROUPS,
          },
        ],
        'perfectionist/sort-union-types': [
          'error',
          {
            ...getCommonRuleOptions(),
            groups: PERFECTIONIST_SORT_INTERSECTION_TYPES_OR_UNION_TYPES_GROUPS,
          },
        ],

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
        'perfectionist/sort-maps': [
          'error',
          {
            ...getCommonRuleOptions(),
          },
        ],
        'perfectionist/sort-modules': [
          'error',
          {
            ...getCommonRuleOptions(),
          },
        ],
        'perfectionist/sort-objects': [
          'error',
          {
            ...getCommonRuleOptions(),
            groups: PERFECTIONIST_SORT_OBJECTS_GROUPS,
          },
        ],
        'perfectionist/sort-sets': [
          'error',
          {
            ...getCommonRuleOptions(),
          },
        ],

        // Overrides rules
        ...options.overridesConstantsRules,
      },
    })
  }

  return configs
}
