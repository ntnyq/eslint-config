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
  toArray,
} from './utils'
import type { Arrayable, ConfigNames, ConfigOptions, TypedConfigItem } from './types'

/**
 * Config factory
 */
// eslint-disable-next-line @typescript-eslint/promise-function-async
export function defineESLintConfig(
  options: ConfigOptions = {},
  userConfigs: Arrayable<TypedConfigItem> = [],
): FlatConfigComposer<TypedConfigItem, ConfigNames> {
  const configs: TypedConfigItem[] = []

  if (options.gitignore ?? true) {
    configs.push(
      ...gitignore({
        ...resolveSubOptions(options, 'gitignore'),
      }),
    )
  }

  configs.push(
    /**
     * Basic
     */
    ...ignores(options.ignores),
    ...jsx(),
    ...node({
      overrides: getOverrides(options, 'node'),
    }),
    ...imports({
      overrides: getOverrides(options, 'imports'),
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

  if (options.jsdoc ?? true) {
    configs.push(
      ...jsdoc({
        overrides: getOverrides(options, 'jsdoc'),
      }),
    )
  }

  if (options.comments ?? true) {
    configs.push(
      ...comments({
        overrides: getOverrides(options, 'comments'),
      }),
    )
  }

  if (options.typescript ?? hasTypeScript) {
    configs.push(
      ...typescript({
        ...resolveSubOptions(options, 'typescript'),
        overrides: getOverrides(options, 'typescript'),
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

  if (options.vue ?? hasVue) {
    configs.push(
      ...vue({
        ...resolveSubOptions(options, 'vue'),
        overrides: getOverrides(options, 'vue'),
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

  if (options.unocss ?? hasUnoCSS) {
    configs.push(
      ...unocss({
        overrides: getOverrides(options, 'unocss'),
      }),
    )
  }

  if (options.markdown ?? true) {
    configs.push(
      ...markdown({
        overrides: getOverrides(options, 'markdown'),
      }),
    )
  }

  if (options.command ?? true) {
    configs.push(
      ...command({
        ...resolveSubOptions(options, 'command'),
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

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  composer.append(
    ...configs,

    // User custom configs
    ...toArray(userConfigs),

    // Keep prettier and specials at last
    ...configSpecials,
    ...configPrettier,
  )

  return composer
}
