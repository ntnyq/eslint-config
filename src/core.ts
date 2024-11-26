/**
 * @file factory function to create ESLint config
 */

import { FlatConfigComposer } from 'eslint-flat-config-utils'
import {
  antfu,
  command,
  comments,
  githubAction,
  gitignore,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  jsx,
  markdown,
  node,
  perfectionist,
  prettier,
  regexp,
  sort,
  specials,
  stylistic,
  test,
  toml,
  typescript,
  unicorn,
  unocss,
  vitest,
  vue,
  yml,
} from './configs'
import {
  getOverrides,
  hasTypeScript,
  hasUnoCSS,
  hasVitest,
  hasVue,
  resolveSubOptions,
} from './utils'
import type { Awaitable, ConfigNames, ConfigOptions, ESLintConfig, TypedConfigItem } from './types'

/**
 * Config factory
 */
// eslint-disable-next-line @typescript-eslint/promise-function-async
export function defineESLintConfig(
  options: ConfigOptions = {},
  ...userConfigs: Awaitable<TypedConfigItem | TypedConfigItem[] | ESLintConfig[]>[]
): FlatConfigComposer<TypedConfigItem, ConfigNames> {
  const {
    /**
     * Shared options
     */
    extensions: supportedExtensions = [],

    /**
     * Conditional by deps
     */
    vue: enableVue = hasVue,
    test: enableTest = hasVitest,
    unocss: enableUnoCSS = hasUnoCSS,
    typescript: enableTypeScript = hasTypeScript,

    /**
     * Enabled by default
     */
    yml: enableYML = true,
    sort: enableSort = true,
    toml: enableTOML = true,
    jsonc: enableJSONC = true,
    antfu: enableAntfu = true,
    regexp: enableRegexp = true,
    unicorn: enableUnicorn = true,
    prettier: enablePrettier = true,
    markdown: enableMarkdown = true,
    stylistic: enableStylistic = true,
    gitignore: enableGitIgnore = true,
    githubAction: enableGitHubAction = true,
    perfectionist: enablePerfectionist = true,
  } = options
  const configs: TypedConfigItem[] = []

  if (enableVue) {
    supportedExtensions.push('vue')
  }

  if (enableGitIgnore) {
    configs.push(
      ...gitignore({
        ...resolveSubOptions(options, 'gitignore'),
      }),
    )
  }

  configs.push(
    ...ignores(options.ignores),
    ...jsx(),
    ...node({
      overrides: getOverrides(options, 'node'),
    }),
    ...command({
      ...resolveSubOptions(options, 'command'),
    }),
    ...imports({
      overrides: getOverrides(options, 'imports'),
    }),
    ...jsdoc({
      typescript: !!enableTypeScript,
      overrides: getOverrides(options, 'jsdoc'),
    }),
    ...comments({
      overrides: getOverrides(options, 'comments'),
    }),
    ...javascript({
      ...resolveSubOptions(options, 'javascript'),
      overrides: getOverrides(options, 'javascript'),
    }),
  )

  if (enablePerfectionist) {
    configs.push(
      ...perfectionist({
        ...resolveSubOptions(options, 'perfectionist'),
        overrides: getOverrides(options, 'perfectionist'),
      }),
    )
  }

  if (enableUnicorn) {
    configs.push(
      ...unicorn({
        overrides: getOverrides(options, 'unicorn'),
      }),
    )
  }

  if (enableRegexp) {
    configs.push(
      ...regexp({
        ...resolveSubOptions(options, 'regexp'),
        overrides: getOverrides(options, 'regexp'),
      }),
    )
  }

  if (enableTypeScript) {
    configs.push(
      ...typescript({
        ...resolveSubOptions(options, 'typescript'),
        extensions: supportedExtensions,
        overrides: getOverrides(options, 'typescript'),
      }),
    )
  }

  if (enableVue) {
    configs.push(
      ...vue({
        ...resolveSubOptions(options, 'vue'),
        typescript: !!enableTypeScript,
        overrides: getOverrides(options, 'vue'),
      }),
    )
  }

  if (enableYML) {
    configs.push(
      ...yml({
        overrides: getOverrides(options, 'yml'),
      }),
    )
  }

  if (enableTOML) {
    configs.push(
      ...toml({
        overrides: getOverrides(options, 'toml'),
      }),
    )
  }

  if (enableJSONC) {
    configs.push(
      ...jsonc({
        overrides: getOverrides(options, 'jsonc'),
      }),
    )
  }

  if (enableSort) {
    configs.push(
      ...sort({
        ...resolveSubOptions(options, 'sort'),
      }),
    )
  }

  if (enableTest) {
    configs.push(
      ...test({
        overrides: getOverrides(options, 'test'),
      }),
      ...vitest({
        overrides: getOverrides(options, 'test'),
      }),
    )
  }

  if (enableUnoCSS) {
    configs.push(
      ...unocss({
        overrides: getOverrides(options, 'unocss'),
      }),
    )
  }

  if (enableMarkdown) {
    configs.push(
      ...markdown({
        extensions: supportedExtensions,
        overrides: getOverrides(options, 'markdown'),
      }),
    )
  }

  if (enableAntfu) {
    configs.push(
      ...antfu({
        overrides: getOverrides(options, 'antfu'),
      }),
    )
  }

  if (enableStylistic) {
    configs.push(
      ...stylistic({
        overrides: getOverrides(options, 'stylistic'),
      }),
    )
  }

  if (enableGitHubAction) {
    configs.push(
      ...githubAction({
        overrides: getOverrides(options, 'githubAction'),
      }),
    )
  }

  const configSpecials = specials({
    ...resolveSubOptions(options, 'specials'),
  })

  const configPrettier = enablePrettier
    ? prettier({
        ...resolveSubOptions(options, 'prettier'),
        overrides: getOverrides(options, 'prettier'),
      })
    : []

  const composer = new FlatConfigComposer<TypedConfigItem, ConfigNames>(
    ...configs,

    // User custom configs
    ...userConfigs,

    // Keep prettier and specials at last
    ...configSpecials,

    ...configPrettier,
  )

  return composer
}
