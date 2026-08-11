import globals from 'globals'
import { PERFECTIONIST } from '../constants'
import { pluginImportX, pluginPerfectionist } from '../eslint'
import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import { hasShadcnVue, resolveSubOptions } from '../utils'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options for a special config branch
 */
export type ConfigSpecialsBranchOptions = OptionsFiles & OptionsOverrides

/**
 * Options for {@link configSpecials}
 */
export interface ConfigSpecialsOptions {
  /**
   * More special case configs
   */
  additionalConfigs?: TypedConfigItem[]

  /**
   * Configure bin files
   * @default true
   */
  bin?: boolean | ConfigSpecialsBranchOptions

  /**
   * Configure cli files
   * @default true
   */
  cli?: boolean | ConfigSpecialsBranchOptions

  /**
   * Configure config files
   * @default true
   */
  configFiles?: boolean | ConfigSpecialsBranchOptions

  /**
   * Configure scripts files
   * @default true
   */
  scripts?: boolean | ConfigSpecialsBranchOptions

  /**
   * Configure shadcn-vue files
   * @default true if shadcn-vue in deps
   */
  shadcnVue?: boolean | ConfigSpecialsBranchOptions

  /**
   * Configure user scripts files
   * @default true
   */
  userScripts?: boolean | ConfigSpecialsBranchOptions
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
    additionalConfigs,
    bin: enableBin = true,
    cli: enableCli = true,
    configFiles: enableConfigFiles = true,
    scripts: enableScripts = true,
    shadcnVue: enableShadcnVue = hasShadcnVue(),
    userScripts: enableUserScripts = true,
  } = options
  const binOptions = resolveSubOptions(options, 'bin')
  const cliOptions = resolveSubOptions(options, 'cli')
  const configFilesOptions = resolveSubOptions(options, 'configFiles')
  const scriptsOptions = resolveSubOptions(options, 'scripts')
  const shadcnVueOptions = resolveSubOptions(options, 'shadcnVue')
  const userScriptsOptions = resolveSubOptions(options, 'userScripts')

  const configs: TypedConfigItem[] = []

  if (enableScripts) {
    configs.push({
      name: 'ntnyq/specials/scripts',
      files: scriptsOptions.files ?? [`**/scripts/${GLOB_SRC}`],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-console': 'off',

        // Overrides rules
        ...scriptsOptions.overrides,
      },
    })
  }

  if (enableCli) {
    configs.push({
      name: 'ntnyq/specials/cli',
      files: cliOptions.files ?? [
        `**/cli/${GLOB_SRC}`,
        `**/cli.${GLOB_SRC_EXT}`,
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-console': 'off',

        // Overrides rules
        ...cliOptions.overrides,
      },
    })
  }

  if (enableBin) {
    configs.push({
      name: 'ntnyq/specials/bin',
      files: binOptions.files ?? [
        `**/bin/${GLOB_SRC}`,
        `**/bin.${GLOB_SRC_EXT}`,
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'antfu/no-import-dist': 'off',
        'no-console': 'off',

        // Overrides rules
        ...binOptions.overrides,
      },
    })
  }

  if (enableUserScripts) {
    configs.push({
      name: 'ntnyq/specials/userscript',
      files: userScriptsOptions.files ?? [`**/*.user.${GLOB_SRC_EXT}`],
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
        ...userScriptsOptions.overrides,
      },
    })
  }

  if (enableConfigFiles) {
    configs.push({
      name: 'ntnyq/specials/config-file',
      files: configFilesOptions.files ?? [`**/*.config*.${GLOB_SRC_EXT}`],
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

        // Overrides rules
        ...configFilesOptions.overrides,
      },
    })
  }

  if (enableShadcnVue) {
    configs.push({
      name: 'ntnyq/specials/shadcn-vue',
      files: shadcnVueOptions.files ?? [
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
        ...shadcnVueOptions.overrides,
      },
    })
  }

  // More special case configs
  // So don't need to append configs to composer
  if (additionalConfigs) {
    configs.push(...additionalConfigs)
  }

  return configs
}
