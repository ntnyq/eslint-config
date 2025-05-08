import { parserYaml, pluginYml } from '../eslint'
import { GLOB_YAML } from '../globs'
import type { OptionsFiles, OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configYml}
 */
export type ConfigYmlOptions = OptionsOverrides
  & OptionsFiles & {
    /**
     * Whether disable prettier related rules
     */
    prettier?: boolean
  }

/**
 * @see {@link https://github.com/ota-meshi/eslint-plugin-yml/blob/master/src/configs/base.ts}
 */
const disabledCoreRules: TypedConfigItem['rules'] = {
  'no-irregular-whitespace': 'off',
  'no-unused-vars': 'off',
  'spaced-comment': 'off',
}

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
        'yml/no-empty-mapping-value': 'off',

        'yml/block-mapping': 'error',
        'yml/block-mapping-question-indicator-newline': 'error',
        'yml/block-sequence': 'error',
        'yml/block-sequence-hyphen-indicator-newline': 'error',
        'yml/flow-mapping-curly-newline': 'error',
        'yml/flow-mapping-curly-spacing': 'error',
        'yml/flow-sequence-bracket-newline': 'error',
        'yml/flow-sequence-bracket-spacing': 'error',
        'yml/indent': 'error',
        'yml/key-spacing': 'error',
        'yml/no-empty-document': 'error',
        'yml/no-empty-key': 'error',
        'yml/no-empty-sequence-entry': 'error',
        'yml/no-irregular-whitespace': 'error',
        'yml/no-tab-indent': 'error',
        'yml/plain-scalar': 'error',
        'yml/quotes': [
          'error',
          {
            avoidEscape: false,
            prefer: 'single',
          },
        ],
        'yml/spaced-comment': 'error',
        'yml/vue-custom-block/no-parsing-error': 'error',

        ...disabledCoreRules,

        ...(options.prettier
          ? {
              'yml/block-mapping-colon-indicator-newline': 'off',
              'yml/block-mapping-question-indicator-newline': 'off',
              'yml/block-sequence-hyphen-indicator-newline': 'off',
              'yml/flow-mapping-curly-newline': 'off',
              'yml/flow-mapping-curly-spacing': 'off',
              'yml/flow-sequence-bracket-newline': 'off',
              'yml/flow-sequence-bracket-spacing': 'off',
              'yml/indent': 'off',
              'yml/key-spacing': 'off',
              'yml/no-multiple-empty-lines': 'off',
              'yml/no-trailing-zeros': 'off',
              'yml/quotes': 'off',
            }
          : {}),

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
