import {
  configsTypeScript,
  mergeProcessors,
  parserPlain,
  pluginMarkdown,
  processorPassThrough,
} from '../eslint'
import {
  GLOB_MARKDOWN,
  GLOB_MARKDOWN_CODE,
  GLOB_MARKDOWN_NESTED,
} from '../globs'
import type {
  OptionsFiles,
  OptionsOverrides,
  OptionsShareable,
  TypedConfigItem,
} from '../types'

/**
 * Options type of {@link configMarkdown}
 */
export type ConfigMarkdownOptions = OptionsFiles &
  OptionsOverrides &
  Pick<OptionsShareable, 'extraFileExtensions'>

/**
 * Config for markdown files
 *
 * @see {@link https://github.com/eslint/markdown}
 *
 * @param options - {@link ConfigMarkdownOptions}
 * @returns ESLint configs
 */
export const configMarkdown = (
  options: ConfigMarkdownOptions = {},
): TypedConfigItem[] => {
  const {
    /**
     * code block files
     */
    files = [GLOB_MARKDOWN_CODE],
    extraFileExtensions = [],
  } = options

  const configs: TypedConfigItem[] = [
    /**
     * extracting code blocks to be linted individually
     */
    ...pluginMarkdown.configs.processor.map(config => ({
      ...config,
      name: `ntnyq/${config.name}`,
    })),

    /**
     * enhance `markdown/recommended/processor`
     */
    {
      name: 'ntnyq/markdown/processor',
      files,
      ignores: [GLOB_MARKDOWN_NESTED],
      processor: mergeProcessors([
        pluginMarkdown.processors.markdown,
        // Just pass through processor
        processorPassThrough,
      ]),
    },

    {
      name: 'ntnyq/markdown/parser',
      files,
      languageOptions: {
        parser: parserPlain,
      },
    },

    {
      name: 'ntnyq/markdown/disabled',
      files: [
        ...files,
        // more nested extensions to disable
        ...extraFileExtensions.map(ext => `${GLOB_MARKDOWN}/**/*${ext}`),
      ],
      languageOptions: {
        parserOptions: {
          // type-aware lint related parserOptions
          project: false,
          projectService: false,
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      rules: {
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'import-x/no-unresolved': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'no-restricted-imports': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'node/prefer-global/buffer': 'off',
        'node/prefer-global/process': 'off',
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',

        // disable all type-aware rules of @typescript-eslint
        ...configsTypeScript.disableTypeChecked.rules,

        // Overrides rules
        ...options.overrides,
      },
    },
  ]

  return configs
}
