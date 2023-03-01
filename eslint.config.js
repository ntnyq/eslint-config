import { defineFlatConfig } from 'eslint-define-config'
import {
  js,
  jsx,
  ts,
  yml,
  astro,
  jsonc,
  unicorn,
  imports,
  pkgOrder,
  prettier,
  markdown,
  eslintComments,
} from './index.js'

export default defineFlatConfig([
  ...js,
  ...jsx,
  ...ts,
  ...yml,
  ...astro,
  ...jsonc,
  ...imports,
  ...unicorn,
  ...pkgOrder,
  ...prettier,
  ...markdown,
  ...eslintComments,
])
