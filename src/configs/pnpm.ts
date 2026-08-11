import { parserJsonc, parserYaml } from '../eslint'
import { GLOB_PACKAGE_JSON, GLOB_PNPM_WORKSPACE_YAML } from '../globs'
import { ensurePackages, interopDefault, resolveSubOptions } from '../utils'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options for a pnpm config branch
 */
export type ConfigPnpmBranchOptions = OptionsFiles & OptionsOverrides

/**
 * Options type of {@link configPnpm}
 */
export interface ConfigPnpmOptions {
  /**
   * Configure package.json rules
   * @default true
   */
  json?: boolean | ConfigPnpmBranchOptions

  /**
   * Configure pnpm-workspace.yaml rules
   * @default true
   */
  yaml?: boolean | ConfigPnpmBranchOptions
}

/**
 * Config for pnpm package manager
 *
 * @see {@link https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm}
 *
 * @param options - {@link ConfigPnpmOptions}
 * @returns ESLint configs
 */
export const configPnpm = async (
  options: ConfigPnpmOptions = {},
): Promise<TypedConfigItem[]> => {
  const { json: enableJson = true, yaml: enableYaml = true } = options
  const jsonOptions = resolveSubOptions(options, 'json')
  const yamlOptions = resolveSubOptions(options, 'yaml')

  if (!enableJson && !enableYaml) {
    return []
  }

  await ensurePackages(['eslint-plugin-pnpm'])

  const pluginPnpm = await interopDefault(import('eslint-plugin-pnpm'))
  const configs: TypedConfigItem[] = []

  if (enableJson) {
    configs.push({
      name: 'ntnyq/pnpm/package-json',
      files: jsonOptions.files ?? [GLOB_PACKAGE_JSON],
      plugins: {
        pnpm: pluginPnpm,
      },
      languageOptions: {
        parser: parserJsonc,
      },
      rules: {
        'pnpm/json-enforce-catalog': [
          'error',
          {
            autofix: true,
          },
        ],
        'pnpm/json-valid-catalog': 'error',

        // Overrides rules
        ...jsonOptions.overrides,
      },
    })
  }

  if (enableYaml) {
    configs.push({
      name: 'ntnyq/pnpm/pnpm-workspace-yaml',
      files: yamlOptions.files ?? [GLOB_PNPM_WORKSPACE_YAML],
      plugins: {
        pnpm: pluginPnpm,
      },
      languageOptions: {
        parser: parserYaml,
      },
      rules: {
        'pnpm/yaml-no-duplicate-catalog-item': 'error',
        'pnpm/yaml-no-unused-catalog-item': 'error',

        // Overrides rules
        ...yamlOptions.overrides,
      },
    })
  }

  return configs
}
