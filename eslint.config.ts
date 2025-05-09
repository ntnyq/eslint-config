import {
  defineESLintConfig,
  PERFECTIONIST_EXTRA_RULE_OPTIONS,
  PERFECTIONIST_PLUGIN_SETTINGS,
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
      tsconfigPath: './tsconfig.json',
      allowDefaultProject: [
        'eslint-inspector.config.ts',
        'eslint.config.ts',
        'build.config.ts',
      ],
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
    settings: {
      perfectionist: PERFECTIONIST_PLUGIN_SETTINGS,
    },
  },
)
