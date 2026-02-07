import { defineESLintConfig, PERFECTIONIST, pluginPerfectionist } from './src'

interface CustomGroupDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'custom' | 'unsorted'
  order?: 'asc' | 'desc'
  newlinesInside?: number | 'ignore'
  selector?: 'member' | 'method' | 'property'
  modifiers?: 'multiline'[]
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
    oxfmt: true,
    prettier: false,
    svgo: true,
    test: true,
    unocss: true,
    vue: true,
    typescript: {
      allowDefaultProject: [],
      tsconfigPath: './tsconfig.json',
      overridesTypeAwareRules: {
        '@typescript-eslint/consistent-generic-constructors': 'off',
      },
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
              newlinesInside: 0,
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
