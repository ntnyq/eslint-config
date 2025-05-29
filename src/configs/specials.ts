import globals from 'globals'
import { PERFECTIONIST } from '../constants'
import { pluginImportX, pluginPerfectionist } from '../eslint'
import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import { hasShadcnVue, resolveSubOptions } from '../utils'
import type { TypedConfigItem } from '../types'

/**
 * Options for {@link configSpecials}
 */
export interface ConfigSpecialsOptions {
  /**
   * Overrides cli rules
   */
  overridesCliRules?: TypedConfigItem['rules']

  /**
   * Overrides bin rules
   */
  overridesBinRules?: TypedConfigItem['rules']

  /**
   * Overrides config files rules
   */
  overridesConfigFileRules?: TypedConfigItem['rules']

  /**
   * Overrides scripts rules
   */
  overridesScriptsRules?: TypedConfigItem['rules']

  /**
   * Overrides user scripts rules
   */
  overridesUserScriptsRules?: TypedConfigItem['rules']

  /**
   * More special case configs
   */
  specialCaseConfigs?: TypedConfigItem[]

  /**
   * ShadcnVue config
   */
  shadcnVue?:
    | boolean
    | {
        files?: TypedConfigItem['files']
        overridesRules?: TypedConfigItem['rules']
      }
}

/**
 * Config for special files
 *
 * @param options - {@link ConfigSpecialsOptions}
 * @returns ESLint configs
 */
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
      name: 'ntnyq/specials/bin',
      files: [`**/bin/${GLOB_SRC}`, `**/bin.${GLOB_SRC_EXT}`],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'antfu/no-import-dist': 'off',
        'no-console': 'off',

        // Overrides rules
        ...options.overridesBinRules,
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
      settings: {
        perfectionist: PERFECTIONIST.pluginSettings,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'import-x/no-default-export': 'off',
        'no-console': 'off',
        'perfectionist/sort-objects': [
          'error',
          {
            ...PERFECTIONIST.partialRuleOptions,
            groups: PERFECTIONIST.sortObjectsGroups,
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
        'vue/html-button-has-type': 'off',
        'vue/no-duplicate-attr-inheritance': 'off',
        'vue/prefer-use-template-ref': 'off',

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
