/**
 * @file eslint plugins
 */

import * as _pluginVue from 'eslint-plugin-vue'
import * as _pluginReact from 'eslint-plugin-react'
import * as _pluginUnoCSS from '@unocss/eslint-plugin'
import * as _pluginUnicorn from 'eslint-plugin-unicorn'
import * as _pluginPrettier from 'eslint-plugin-prettier'
import * as _pluginMarkdown from 'eslint-plugin-markdown'
import * as _pluginReactHooks from 'eslint-plugin-react-hooks'
import * as _pluginComments from 'eslint-plugin-eslint-comments'
import * as _pluginTypeScript from '@typescript-eslint/eslint-plugin'

function interopDefault(mod: any) {
  return mod.default || mod
}

export const pluginVue = interopDefault(_pluginVue)
export const pluginReact = interopDefault(_pluginReact)
export const pluginUnoCSS = interopDefault(_pluginUnoCSS)
export const pluginUnicorn = interopDefault(_pluginUnicorn)
export const pluginPrettier = interopDefault(_pluginPrettier)
export const pluginMarkdown = interopDefault(_pluginMarkdown)
export const pluginComments = interopDefault(_pluginComments)
export const pluginReactHooks = interopDefault(_pluginReactHooks)
export const pluginTypescript = interopDefault(_pluginTypeScript)

// Re export

// @ts-expect-error export =
export * as pluginYml from 'eslint-plugin-yml'
// @ts-expect-error export =
export * as pluginAstro from 'eslint-plugin-astro'

export * as pluginJsonc from 'eslint-plugin-jsonc'
export * as pluginImport from 'eslint-plugin-import'
