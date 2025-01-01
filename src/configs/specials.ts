import globals from 'globals'
import { pluginImportX, pluginPerfectionist } from '../eslint'
import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import { hasShadcnVue, resolveSubOptions } from '../utils'
import type { ConfigSpecialsOptions, TypedConfigItem } from '../types'

export const specials = (options: ConfigSpecialsOptions = {}): TypedConfigItem[] => {
  const {
    // Enable shadcn-vue support
    shadcnVue: enableShadcnVue = hasShadcnVue,
  } = options

  const configs: TypedConfigItem[] = [
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
  ]

  if (enableShadcnVue) {
    const shadcnOptions = resolveSubOptions(options, 'shadcnVue')

    configs.push({
      name: 'ntnyq/specials/shadcn-vue',
      files: shadcnOptions.files || ['**/components/ui/**/*.ts', '**/components/ui/**/*.vue'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',

        // Overrides rules
        ...shadcnOptions.overridesRules,
      },
    })
  }

  // More special case configs
  // So don't need to append configs to composer
  if (options.specialCaseConfigs) {
    configs.push(...options.specialCaseConfigs)
  }

  return configs
}
