/**
 * @file shared constants
 */

export const GLOB_SRC = '**/*.?([mt])[jt]s?(x)'

export const GLOB_JS = '**/*.?([mt])js'
export const GLOB_JSX = '**/*.?([mt])jsx'

export const GLOB_TS = '**/*.?([mt])ts'
export const GLOB_TSX = '**/*.?([mt])tsx'

export const GLOB_STYLE = '**/*.{c,le,sc}ss'
export const GLOB_CSS = '**/*.css'
export const GLOB_LESS = '**/*.less'
export const GLOB_SCSS = '**/*.scss'

export const GLOB_JSON = '**/*.json'
export const GLOB_JSON5 = '**/*.json5'
export const GLOB_JSONC = '**/*.jsonc'

export const GLOB_VUE = '**/*.vue'
export const GLOB_ASTRO = '**/*.astro'

export const GLOB_MARKDOWN = '**/*.md'
export const GLOB_YAML = '**/*.y?(a)ml'
export const GLOB_HTML = '**/*.htm?(l)'

export const GLOB_ALL_SRC = [
  GLOB_SRC,
  GLOB_STYLE,
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_MARKDOWN,
  GLOB_VUE,
  GLOB_YAML,
  GLOB_HTML,
]

export const GLOB_NODE_MODULES = '**/node_modules/**'
export const GLOB_DIST = '**/dist/**'
export const GLOB_LOCKFILE = ['**/package-lock.json', '**/yarn.lock', '**/pnpm-lock.yaml']
export const GLOB_EXCLUDE = [
  GLOB_NODE_MODULES,
  GLOB_DIST,
  ...GLOB_LOCKFILE,
  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/output',
  '**/coverage',
  '**/temp',
  '**/cache',
  '**/fixtures',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.vercel',
  '**/.changeset',
  '**/__snapshots__',
  '**/auto-import.d.ts',
  '**/components.d.ts',
  '**/.npmrc',
  '**/.yarnrc',
]
