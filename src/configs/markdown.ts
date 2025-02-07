import {
  configsTypescript,
  mergeProcessors,
  parserPlain,
  pluginMarkdown,
  processorPassThrough,
} from '../eslint'
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE, GLOB_MARKDOWN_NESTED } from '../globs'
import type { ConfigMarkdownOptions, TypedConfigItem } from '../types'

export const configMarkdown = (options: ConfigMarkdownOptions = {}): TypedConfigItem[] => {
  const {
    /**
     * code block files
     */
    files = [GLOB_MARKDOWN_CODE],

    /**
     * other extensions
     */
    extensions = [],
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
        ...extensions.map(ext => `${GLOB_MARKDOWN}/**/*.${ext}`),
      ],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
          // type-aware lint related parserOptions
          project: false,
          projectService: false,
        },
      },
      rules: {
        'no-undef': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'no-restricted-imports': 'off',

        'node/prefer-global/buffer': 'off',
        'node/prefer-global/process': 'off',

        'import-x/no-unresolved': 'off',

        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',

        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',

        // disable all type-aware rules of @typescript-eslint
        ...(configsTypescript.disableTypeChecked as TypedConfigItem).rules,

        // Overrides rules
        ...options.overrides,
      },
    },
  ]

  return configs
}
