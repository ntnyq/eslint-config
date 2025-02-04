import { parserJsonc, pluginDepend } from '../eslint'
import { GLOB_PACKAGE_JSON, GLOB_SRC } from '../globs'
import type { ConfigDependOptions, TypedConfigItem } from '../types'

/**
 * @see {@link https://github.com/es-tooling/module-replacements}
 */
export const configDepend = (options: ConfigDependOptions = {}): TypedConfigItem[] => {
  const {
    files = [GLOB_SRC],
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
        'depend/ban-dependencies': 'error',

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
        'depend/ban-dependencies': 'error',

        // Overrides rules
        ...options.overrides,
      },
    })
  }

  return configs
}
