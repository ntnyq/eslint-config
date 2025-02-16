import { parserYaml, pluginYml } from '../eslint'
import { GLOB_YAML } from '../globs'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configYml}
 */
export type ConfigYmlOptions = OptionsOverrides & OptionsFiles

/**
 * Config for yml, yaml files
 *
 * @see {@link https://ota-meshi.github.io/eslint-plugin-yml}
 *
 * @param options - {@link ConfigYmlOptions}
 * @returns ESLint configs
 */
export const configYml = (
  options: ConfigYmlOptions = {},
): TypedConfigItem[] => {
  const { files = [GLOB_YAML] } = options

  return [
    {
      name: 'ntnyq/yml',
      files,
      plugins: {
        yml: pluginYml,
      },
      languageOptions: {
        parser: parserYaml,
      },
      rules: {
        ...(pluginYml.configs.standard as TypedConfigItem).rules,
        ...(pluginYml.configs.prettier as TypedConfigItem).rules,

        'yml/no-empty-mapping-value': 'off',

        'yml/quotes': ['error', { avoidEscape: false, prefer: 'single' }],

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
