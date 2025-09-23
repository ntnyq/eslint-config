import { parserJsonc, pluginDepend } from '../eslint'
import { GLOB_PACKAGE_JSON, GLOB_SRC } from '../globs'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configDepend}
 */
export type ConfigDependOptions = OptionsFiles
  & OptionsOverrides & {
    /**
     * Check deps in package.json
     *
     * @default true
     */
    packageJson?: boolean
    /**
     * Allowed dependencies
     *
     * @default []
     */
    allowed?: string[]
    /**
     * Use customized modules to ban
     *
     * @default []
     */
    modules?: string[]
    /**
     * Preset list
     * @see {@link https://github.com/es-tooling/eslint-plugin-depend/blob/main/docs/rules/ban-dependencies.md#presets}
     *
     * @default ['native', 'microutilities', 'preferred']
     */
    presets?: Array<'native' | 'microutilities' | 'preferred'>
  }

/**
 * Config for optimisations dependency
 *
 * @see {@link https://github.com/es-tooling/eslint-plugin-depend}
 * @see {@link https://github.com/es-tooling/module-replacements}
 *
 * @param options - {@link ConfigDependOptions}
 * @returns ESLint configs
 */
export const configDepend = (
  options: ConfigDependOptions = {},
): TypedConfigItem[] => {
  const {
    files = [GLOB_SRC],
    allowed = [],
    modules = [],
    packageJson: enableCheckPackageJson = true,
    presets = ['native', 'microutilities', 'preferred'],
  } = options

  const rules: TypedConfigItem['rules'] = {
    'depend/ban-dependencies': [
      'error',
      {
        allowed,
        modules,
        presets,
      },
    ],

    // Overrides rules
    ...options.overrides,
  }

  const configs: TypedConfigItem[] = [
    {
      name: 'ntnyq/depend',
      files,
      plugins: {
        depend: pluginDepend,
      },
      rules,
    },
  ]

  if (enableCheckPackageJson) {
    configs.push({
      name: 'ntnyq/depend/package-json',
      files: [GLOB_PACKAGE_JSON],
      plugins: {
        depend: pluginDepend,
      },
      languageOptions: {
        parser: parserJsonc,
      },
      rules,
    })
  }

  return configs
}
