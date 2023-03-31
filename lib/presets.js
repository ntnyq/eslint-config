// @ts-check

import { ts } from './ts.js'
import { yml } from './yml.js'
import { vue } from './vue.js'
import { astro } from './astro.js'
import { prettier } from './prettier.js'
import { markdown } from './markdown.js'
import { jsonc, pkgOrder } from './jsonc.js'
import { imports, js, jsx, unicorn } from './js.js'
import { eslintComments } from './eslint-comments.js'
import { GLOB_EXCLUDE } from './shared.js'

/**
 * @typedef { import('eslint-define-config').FlatESLintConfig } FlatESLintConfig
 */

/** @type {FlatESLintConfig[]} */
export const basic = [
  { ignores: GLOB_EXCLUDE },
  ...js,
  ...jsx,
  ...ts,
  ...vue,
  ...yml,
  ...imports,
  ...unicorn,
  ...jsonc,
  ...pkgOrder,
  ...markdown,
  ...eslintComments,
]

/** @type {FlatESLintConfig[]} */
export const all = [...vue, ...astro, ...basic, ...prettier]

/** @type {(config?: FlatESLintConfig | FlatESLintConfig[], enables?: Partial<{
 * vue: boolean
 * prettier: boolean
 * markdown: boolean
 * }>) => FlatESLintConfig[]} */
export function ntnyq(
  config = [],
  { vue: enableVue = true, prettier: enablePrettier = true, markdown: enableMarkdown = true } = {},
) {
  const configs = [...basic]
  if (enableVue !== false) {
    configs.push(...vue)
  }
  if (enableMarkdown !== false) {
    configs.push(...markdown)
  }
  if (enablePrettier !== false) {
    configs.push(...prettier)
  }
  if (Object.keys(config).length > 0) {
    configs.push(...(Array.isArray(config) ? config : [config]))
  }
  return configs
}
