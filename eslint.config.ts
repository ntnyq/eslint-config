import {
  defineESLintConfig,
  PERFECTIONIST_COMMON_RULE_OPTIONS,
  PERFECTIONIST_EXTRA_RULE_OPTIONS,
  PERFECTIONIST_SORT_OBJECTS_GROUPS,
  pluginPerfectionist,
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
          ...PERFECTIONIST_COMMON_RULE_OPTIONS,
          ...PERFECTIONIST_EXTRA_RULE_OPTIONS,
          customGroups: [
            ...ESLINT_CONFIG_GROUP,
            {
              elementValuePattern: 'off',
              groupName: 'rule-severity-off',
              newlinesInside: 'never',
              order: 'asc',
              type: 'alphabetical',
            },
            {
              elementValuePattern: 'warn',
              groupName: 'rule-severity-warn',
              newlinesInside: 'never',
              order: 'asc',
              type: 'alphabetical',
            },
            {
              elementValuePattern: 'error',
              groupName: 'rule-severity-error',
              newlinesInside: 'never',
              order: 'asc',
              type: 'alphabetical',
            },
          ],
          groups: [
            ...ESLINT_CONFIG_GROUP.map(v => v.groupName),
            { newlinesBetween: 'always' },
            'rule-severity-off',
            { newlinesBetween: 'always' },
            'rule-severity-warn',
            { newlinesBetween: 'always' },
            'rule-severity-error',
            { newlinesBetween: 'always' },
            ...PERFECTIONIST_SORT_OBJECTS_GROUPS,
          ],
        },
      ],
    },
  },
)
