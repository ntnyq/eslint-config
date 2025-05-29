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
const ESLINT_RULE_SEVERITY = ['off', 'warn', 'error']

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
            ...ESLINT_RULE_SEVERITY.map<CustomGroupDefinition>(severity => ({
              elementValuePattern: severity,
              groupName: `rule-severity-${severity}`,
              newlinesInside: 'never',
              order: 'asc',
              type: 'alphabetical',
            })),
          ],
          groups: [
            ...ESLINT_CONFIG_GROUP.map(group => group.groupName),
            ...ESLINT_RULE_SEVERITY.map(
              severity => `rule-severity-${severity}`,
            ),
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
