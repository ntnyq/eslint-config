import { PERFECTIONIST } from '../constants'
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
   * files for `constants`, will overrides default values
   */
  filesConstants?: TypedConfigItem['files']

  /**
   * files for `enums`, will overrides default values
   */
  filesEnums?: TypedConfigItem['files']

  /**
   * files for `types`, will overrides default values
   */
  filesTypes?: TypedConfigItem['files']

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
    filesEnums = [`**/enums/${GLOB_SRC}`, `**/enums.${GLOB_SRC_EXT}`],
    filesTypes = [...GLOB_TYPES],
    partitionByComment = PERFECTIONIST.partialRuleOptions.partitionByComment,
    sortConstants: enableSortConstants = true,
    sortEnums: enableSortEnums = true,
    sortTypes: enableSortTypes = true,
    filesConstants = [
      `**/constants/${GLOB_SRC}`,
      `**/constants.${GLOB_SRC_EXT}`,
    ],
  } = options

  const sharedOptionsWithNewlinesBetween = {
    newlinesBetween: 'ignore',
    partitionByComment,
  } as const

  const commonRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-export-attributes': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortExportAttributesGroups,
      },
    ],
    'perfectionist/sort-exports': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortExportsGroups,
        type: 'line-length',
      },
    ],
    'perfectionist/sort-import-attributes': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortImportAttributesGroups,
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortImportsTypes,
        internalPattern: ['^~/.+', '^@/.+', '^#.+'],
      },
    ],
    'perfectionist/sort-named-exports': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortNamedExportsGroups,
        ignoreAlias: false,
      },
    ],
    'perfectionist/sort-named-imports': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortNamedImportsGroups,
        ignoreAlias: false,
      },
    ],
  }
  const sharedRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-enums': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
      },
    ],
  }
  const sortEnumsRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-modules': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
      },
    ],
  }
  const sortTypesRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-heritage-clauses': 'error',
    'perfectionist/sort-interfaces': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortInterfacesOrObjectTypesGroups,
      },
    ],
    'perfectionist/sort-intersection-types': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortIntersectionTypesOrUnionTypesGroups,
      },
    ],
    'perfectionist/sort-object-types': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortInterfacesOrObjectTypesGroups,
      },
    ],
    'perfectionist/sort-union-types': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortIntersectionTypesOrUnionTypesGroups,
      },
    ],
  }
  const sortConstantsRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-maps': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
      },
    ],
    'perfectionist/sort-objects': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortObjectsGroups,
      },
    ],
    'perfectionist/sort-sets': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
      },
    ],
  }
  const extraRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-array-includes': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: ['literal', 'spread'],
      },
    ],
    'perfectionist/sort-classes': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortClassesGroups,
      },
    ],
    'perfectionist/sort-decorators': [
      'error',
      {
        partitionByComment,
      },
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        groups: ['shorthand', 'multiline', 'unknown'],
      },
    ],
    'perfectionist/sort-switch-case': 'error',
    'perfectionist/sort-variable-declarations': [
      'error',
      {
        partitionByComment,
      },
    ],
  }

  // Common plugin and settings configuration
  const sharedConfig = {
    plugins: {
      perfectionist: pluginPerfectionist,
    },
    settings: {
      perfectionist: PERFECTIONIST.pluginSettings,
    },
  } as const

  const configs: TypedConfigItem[] = [
    {
      name: options.all
        ? 'ntnyq/perfectionist/all'
        : 'ntnyq/perfectionist/common',
      ...sharedConfig,
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
      files: filesEnums,
      ...sharedConfig,
      rules: {
        ...sharedRules,
        ...sortEnumsRules,
        ...options.overridesEnumsRules,
      },
    })
  }

  if (enableSortTypes) {
    configs.push({
      name: 'ntnyq/perfectionist/types',
      files: filesTypes,
      ...sharedConfig,
      rules: {
        ...sharedRules,
        ...sortTypesRules,
        ...options.overridesTypesRules,
      },
    })
  }

  if (enableSortConstants) {
    configs.push({
      name: 'ntnyq/perfectionist/constants',
      files: filesConstants,
      ...sharedConfig,
      rules: {
        ...sharedRules,
        ...sortConstantsRules,
        ...options.overridesConstantsRules,
      },
    })
  }

  return configs
}
