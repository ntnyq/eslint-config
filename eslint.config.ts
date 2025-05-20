import { defineESLintConfig, PERFECTIONIST, pluginPerfectionist } from './src'

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

const ESLINT_CONFIG_GROUP: CustomGroupDefinition[] = [
  'name',
  'files',
  'ignores',
  'plugins',
  'settings',
  'language',
  'processor',
  'languageOptions',
  'linterOptions',
  'rules',
  'overrides',
].map(key => ({
  elementNamePattern: `^${key}$`,
  groupName: `config-${key}`,
}))

export default defineESLintConfig(
  {
    svgo: true,
    test: true,
    unocss: true,
    vue: true,
    typescript: {
      allowDefaultProject: [],
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
          ...PERFECTIONIST.partialRuleOptions,
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
            ...PERFECTIONIST.sortObjectsGroups,
          ],
        },
      ],
    },
    settings: {
      perfectionist: PERFECTIONIST.pluginSettings,
    },
  },
)
