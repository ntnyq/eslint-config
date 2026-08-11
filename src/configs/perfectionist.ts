import { PERFECTIONIST } from '../constants'
import { pluginPerfectionist } from '../eslint'
import { GLOB_SRC, GLOB_SRC_EXT, GLOB_TYPES } from '../globs'
import { resolveSubOptions } from '../utils'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

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
 * Options for the common perfectionist config
 */
export type ConfigPerfectionistCommonOptions = OptionsOverrides

/**
 * Options for a scoped perfectionist config branch
 */
export type ConfigPerfectionistBranchOptions = OptionsFiles & OptionsOverrides

/**
 * Options type of {@link configPerfectionist}
 */
export interface ConfigPerfectionistOptions {
  /**
   * Enable all perfectionist rule
   *
   * Once enabled, all `types`, `enums` and `constants` related options will be ignores
   *
   * @default false
   */
  all?: boolean

  /**
   * Configure common rules
   */
  common?: ConfigPerfectionistCommonOptions

  /**
   * Configure sorting for constants
   * @default true
   */
  constants?: boolean | ConfigPerfectionistBranchOptions

  /**
   * Configure sorting for enums
   * @default true
   */
  enums?: boolean | ConfigPerfectionistBranchOptions

  /**
   * Shared `partitionByComment` option
   *
   * @default ['@pg', '@perfectionist-group']
   */
  partitionByComment?: PerfectionistPartitionByComment

  /**
   * Configure sorting for types
   * @default true
   */
  types?: boolean | ConfigPerfectionistBranchOptions
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
    all: enableAll = false,
    constants: enableSortConstants = true,
    enums: enableSortEnums = true,
    partitionByComment = PERFECTIONIST.partialRuleOptions.partitionByComment,
    types: enableSortTypes = true,
  } = options
  const commonOptions = resolveSubOptions(options, 'common')
  const constantsOptions = resolveSubOptions(options, 'constants')
  const enumsOptions = resolveSubOptions(options, 'enums')
  const typesOptions = resolveSubOptions(options, 'types')
  const filesConstants = constantsOptions.files ?? [
    `**/constants/${GLOB_SRC}`,
    `**/constants.${GLOB_SRC_EXT}`,
  ]
  const filesEnums = enumsOptions.files ?? [
    `**/enums/${GLOB_SRC}`,
    `**/enums.${GLOB_SRC_EXT}`,
  ]
  const filesTypes = typesOptions.files ?? [...GLOB_TYPES]

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
        groups: PERFECTIONIST.sortImportsGroups,
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
        groups: ['literal'],
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
        groups: ['initialized', 'uninitialized'],
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
      name: enableAll
        ? 'ntnyq/perfectionist/all'
        : 'ntnyq/perfectionist/common',
      ...sharedConfig,
      rules: {
        ...commonRules,
        ...(enableAll
          ? {
              ...sharedRules,
              ...sortEnumsRules,
              ...sortTypesRules,
              ...sortConstantsRules,
              ...extraRules,
            }
          : {}),
        ...commonOptions.overrides,
      },
    },
  ]

  // return in advanced, ignore other options
  if (enableAll) {
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
        ...enumsOptions.overrides,
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
        ...typesOptions.overrides,
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
        ...constantsOptions.overrides,
      },
    })
  }

  return configs
}
