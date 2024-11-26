import globals from 'globals'
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

  // More special case configs
  // So don't need to append configs to composer
  ...(options.specialCaseConfigs ? options.specialCaseConfigs : []),
]
