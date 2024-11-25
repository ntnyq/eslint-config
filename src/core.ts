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
export async function defineESLintConfig(
  options: ConfigOptions = {},
  ...userConfigs: Awaitable<TypedConfigItem | TypedConfigItem[] | ESLintConfig[]>[]
): Promise<FlatConfigComposer<TypedConfigItem, ConfigNames>> {
  const configs: TypedConfigItem[] = []
  const {
    markdown: enableMarkdown = true,
    gitignore: enableGitIgnore = true,
    vue: enableVue = hasVue,
    unocss: enableUnoCSS = hasUnoCSS,
    typescript: enableTypeScript = hasTypeScript,
    extensions: supportedExtensions = [],
  } = options

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

  if (options.perfectionist ?? true) {
    configs.push(
      ...perfectionist({
        ...resolveSubOptions(options, 'perfectionist'),
        overrides: getOverrides(options, 'perfectionist'),
      }),
    )
  }

  if (options.unicorn ?? true) {
    configs.push(
      ...unicorn({
        overrides: getOverrides(options, 'unicorn'),
      }),
    )
  }

  if (options.regexp ?? true) {
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

  if (options.yml ?? true) {
    configs.push(
      ...yml({
        overrides: getOverrides(options, 'yml'),
      }),
    )
  }

  if (options.toml ?? true) {
    configs.push(
      ...toml({
        overrides: getOverrides(options, 'toml'),
      }),
    )
  }

  if (options.jsonc ?? true) {
    configs.push(
      ...jsonc({
        overrides: getOverrides(options, 'jsonc'),
      }),
    )
  }

  if (options.sort ?? true) {
    configs.push(
      ...sort({
        ...resolveSubOptions(options, 'sort'),
      }),
    )
  }

  if (options.test ?? hasVitest) {
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

  if (options.antfu ?? true) {
    configs.push(
      ...antfu({
        overrides: getOverrides(options, 'antfu'),
      }),
    )
  }

  if (options.stylistic ?? true) {
    configs.push(
      ...stylistic({
        overrides: getOverrides(options, 'stylistic'),
      }),
    )
  }

  if (options.githubAction ?? true) {
    configs.push(
      ...githubAction({
        overrides: getOverrides(options, 'githubAction'),
      }),
    )
  }

  const configSpecials = specials()

  const configPrettier =
    (options.prettier ?? true)
      ? prettier({
          ...resolveSubOptions(options, 'prettier'),
          overrides: getOverrides(options, 'prettier'),
        })
      : []

  const composer = new FlatConfigComposer<TypedConfigItem, ConfigNames>()

  await composer.append(
    ...configs,

    // User custom configs
    ...userConfigs,

    // Keep prettier and specials at last
    ...configSpecials,

    ...configPrettier,
  )

  return composer
}
