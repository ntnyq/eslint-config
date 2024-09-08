/**
 * @file presets
 */

import { FlatConfigComposer } from 'eslint-flat-config-utils'
import {
  getOverrides,
  hasTypeScript,
  hasUnoCSS,
  hasVitest,
  hasVue,
  resolveSubOptions,
  toArray,
} from './utils'
import {
  command,
  comments,
  gitignore,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  jsx,
  markdown,
  node,
  prettier,
  regexp,
  sortI18nLocale,
  sortPackageJson,
  sortTsConfig,
  toml,
  typescript,
  unicorn,
  unocss,
  vitest,
  vue,
  yml,
} from './configs'
import type { Arrayable, ConfigName, ConfigOptions, TypedConfigItem } from './types'

/**
 * Config factory
 */
export function ntnyq(
  options: ConfigOptions = {},
  userConfigs: Arrayable<TypedConfigItem> = [],
): FlatConfigComposer<TypedConfigItem, ConfigName> {
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

  if (options.sortI18nLocale ?? true) {
    configs.push(...sortI18nLocale())
  }

  if (options.sortTsConfig ?? true) {
    configs.push(...sortTsConfig())
  }

  if (options.sortPackageJson ?? true) {
    configs.push(...sortPackageJson())
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

  if (options.vue ?? hasVue) {
    configs.push(
      ...vue({
        ...resolveSubOptions(options, 'vue'),
        overrides: getOverrides(options, 'vue'),
      }),
    )
  }

  if (options.vitest ?? hasVitest) {
    configs.push(
      ...vitest({
        overrides: getOverrides(options, 'vitest'),
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

  const configPrettier =
    (options.prettier ?? true)
      ? prettier({
          ...resolveSubOptions(options, 'prettier'),
          overrides: getOverrides(options, 'prettier'),
        })
      : []

  const composer = new FlatConfigComposer<TypedConfigItem, ConfigName>()

  composer.append(
    ...configs,

    // User custom configs
    ...toArray(userConfigs),

    // Keep prettier at last
    ...configPrettier,
  )

  return composer
}
