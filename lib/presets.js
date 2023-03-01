import jsConfig from '@eslint/js'
import { ts } from './ts.js'
import { yml } from './yml.js'
import { vue } from './vue.js'
import { markdown } from './markdown.js'
import { jsonc, pkgOrder } from './jsonc.js'
import { imports, js, jsx, unicorn } from './js.js'
import { eslintComments } from './eslint-comments.js'

/** @type {import('eslint-define-config').FlatESLintConfig[]} */
export const presetBasic = [
  jsConfig.configs.recommended,
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
