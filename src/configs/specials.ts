import globals from 'globals'
import { pluginImportX, pluginPerfectionist } from '../eslint'
import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import type { ConfigSpecialsOptions, TypedConfigItem } from '../types'

export const specials = (options: ConfigSpecialsOptions = {}): TypedConfigItem[] => [
  {
    name: 'ntnyq/specials/scripts',
    files: [`**/scripts/${GLOB_SRC}`],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Overrides rules
      ...options.overridesScriptsRules,
    },
  },
  {
    name: 'ntnyq/specials/cli',
    files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Overrides rules
      ...options.overridesCliRules,
    },
  },
  {
    name: 'ntnyq/specials/userscript',
    files: [`**/*.user.${GLOB_SRC_EXT}`],
    languageOptions: {
      globals: {
        ...globals.greasemonkey,
      },
    },
    rules: {
      camelcase: [
        'error',
        {
          allow: ['^GM_.+'],
        },
      ],

      // Overrides rules
      ...options.overridesUserScriptsRules,
    },
  },
  {
    name: 'ntnyq/specials/config-file',
    files: [`**/*.config*.${GLOB_SRC_EXT}`],
    plugins: {
      'import-x': pluginImportX,
      perfectionist: pluginPerfectionist,
    },
    rules: {
      'no-console': 'off',
      'import-x/no-default-export': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',

      'perfectionist/sort-objects': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          partitionByComment: true,
          groups: ['unknown', 'method', 'multiline'],
        },
      ],

      ...options.overridesConfigFileRules,
    },
  },

  // More special case configs
  // So don't need to append configs to composer
  ...(options.specialCaseConfigs ? options.specialCaseConfigs : []),
]
