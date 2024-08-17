/**
 * @file presets
 */

import { getOverrides, hasTypeScript, hasUnoCSS, hasVitest, hasVue, toArray } from './utils'
import {
  command,
  comments,
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
import type { Arrayable, ConfigOptions, TypedConfigItem } from './types'

/**
 * Config factory
 */
// eslint-disable-next-line complexity
export function ntnyq(options: ConfigOptions = {}, customConfig: Arrayable<TypedConfigItem> = []) {
  const configs: TypedConfigItem[] = [
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
      overrides: getOverrides(options, 'javascript'),
    }),
  ]

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
        overrides: getOverrides(options, 'typescript'),
      }),
    )
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
    configs.push(...command())
  }

  configs.push(...toArray(customConfig))

  /**
   * Keep prettier at last
   */
  if (options.prettier ?? true) {
    configs.push(
      ...prettier({
        overrides: getOverrides(options, 'prettier'),
      }),
    )
  }

  return configs
}
