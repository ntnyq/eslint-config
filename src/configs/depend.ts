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
     */
    allowed?: string[]
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
    // check package.json file
    packageJson: enableCheckPackageJson = true,
  } = options

  const configs: TypedConfigItem[] = [
    {
      name: 'ntnyq/depend',
      files,
      plugins: {
        depend: pluginDepend,
      },
      rules: {
        'depend/ban-dependencies': [
          'error',
          {
            allowed,
          },
        ],

        // Overrides rules
        ...options.overrides,
      },
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
      rules: {
        'depend/ban-dependencies': [
          'error',
          {
            allowed,
          },
        ],

        // Overrides rules
        ...options.overrides,
      },
    })
  }

  return configs
}
