import { defineFlatConfig } from 'eslint-define-config'
import {
  js,
  jsx,
  unicorn,
  imports,
  jsonc,
  pkgOrder,
  ts,
  yml,
  prettier,
  markdown,
  eslintComments,
} from './index.js'

export default defineFlatConfig([
  ...js,
  ...jsx,
  ...ts,
  ...imports,
  ...unicorn,
  ...jsonc,
  ...pkgOrder,
  ...yml,
  ...markdown,
  ...eslintComments,
  ...prettier,
])
