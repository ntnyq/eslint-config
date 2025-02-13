import {
  COMMON_SHARED_PERFECTIONIST_RULE_OPTIONS,
  defineESLintConfig,
  EXTRA_SHARED_PERFECTIONIST_RULE_OPTIONS,
  pluginPerfectionist,
  SHARED_SORT_OBJECTS_GROUPS,
} from './src'

interface CustomGroupDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'unsorted'
  order?: 'asc' | 'desc'
  newlinesInside?: 'always' | 'never'
  selector?: string
  modifiers?: string[]
  elementNamePattern?:
    | string
    | string[]
    | { pattern: string; flags?: string }
    | { pattern: string; flags?: string }[]
  elementValuePattern?:
    | string
    | string[]
    | { pattern: string; flags?: string }
    | { pattern: string; flags?: string }[]
}

const ESLINT_CONFIG_GROUP = [
  {
    elementNamePattern: '^name$',
    groupName: 'config-name',
  },
  {
    elementNamePattern: '^files$',
    groupName: 'config-files',
  },
  {
    elementNamePattern: '^ignores$',
    groupName: 'config-ignores',
  },
  {
    elementNamePattern: '^plugins$',
    groupName: 'config-plugins',
  },
  {
    elementNamePattern: '^language$',
    groupName: 'config-language',
  },
  {
    elementNamePattern: '^processor$',
    groupName: 'config-processor',
  },
  {
    elementNamePattern: '^settings$',
    groupName: 'config-settings',
  },
  {
    elementNamePattern: '^languageOptions$',
    groupName: 'config-language-options',
  },
  {
    elementNamePattern: '^linterOptions$',
    groupName: 'config-linter-options',
  },
  {
    elementNamePattern: '^rules$',
    groupName: 'config-rules',
  },
] satisfies CustomGroupDefinition[]
const RULE_SERVERITY_GROUP = [
  {
    elementValuePattern: 'off',
    groupName: 'rule-severity-off',
    order: 'asc',
    type: 'alphabetical',
  },
  {
    elementValuePattern: 'warn',
    groupName: 'rule-severity-warn',
    order: 'asc',
    type: 'alphabetical',
  },
  {
    elementValuePattern: 'error',
    groupName: 'rule-severity-error',
    order: 'asc',
    type: 'alphabetical',
  },
] satisfies CustomGroupDefinition[]

export default defineESLintConfig(
  {
    svgo: true,
    test: true,
    unocss: true,
    vue: true,
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
  },
  {
    files: ['src/configs/*.ts'],
    name: 'ntnyq/perfectionist/eslint-configs',
    plugins: {
      perfectionist: pluginPerfectionist,
    },
    rules: {
      'perfectionist/sort-objects': [
        'error',
        {
          ...COMMON_SHARED_PERFECTIONIST_RULE_OPTIONS,
          ...EXTRA_SHARED_PERFECTIONIST_RULE_OPTIONS,
          customGroups: [...ESLINT_CONFIG_GROUP, ...RULE_SERVERITY_GROUP],
          groups: [
            ...ESLINT_CONFIG_GROUP.map(v => v.groupName),

            // rule-severity-groups
            { newlinesBetween: 'always' },
            'rule-severity-off',
            { newlinesBetween: 'always' },
            'rule-severity-warn',
            { newlinesBetween: 'always' },
            'rule-severity-error',
            { newlinesBetween: 'always' },

            ...SHARED_SORT_OBJECTS_GROUPS,
          ],
        },
      ],
    },
  },
)
