import globals from 'globals'
import { pluginImportX, pluginPerfectionist } from '../eslint'
import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import { hasShadcnVue, resolveSubOptions } from '../utils'
import type { ConfigSpecialsOptions, TypedConfigItem } from '../types'

export const configSpecials = (
  options: ConfigSpecialsOptions = {},
): TypedConfigItem[] => {
  const {
    // Enable shadcn-vue support
    shadcnVue: enableShadcnVue = hasShadcnVue(),
  } = options

  const configs: TypedConfigItem[] = [
    {
      name: 'ntnyq/specials/scripts',
      files: [`**/scripts/${GLOB_SRC}`],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-console': 'off',

        // Overrides rules
        ...options.overridesScriptsRules,
      },
    },
    {
      name: 'ntnyq/specials/cli',
      files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-console': 'off',

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
        '@typescript-eslint/explicit-function-return-type': 'off',
        'import-x/no-default-export': 'off',
        'no-console': 'off',

        'perfectionist/sort-objects': [
          'error',
          {
            ignoreCase: true,
            newlinesBetween: 'ignore',
            order: 'asc',
            partitionByComment: true,
            type: 'alphabetical',
            groups: [
              'property',
              'multiline-property',
              'method',
              'multiline-method',
              'unknown',
            ],
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
      files: shadcnOptions.files || [
        '**/components/ui/**/*.ts',
        '**/components/ui/**/*.vue',
      ],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'import-x/consistent-type-specifier-style': 'off',
        'vue/define-emits-declaration': 'off',

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
