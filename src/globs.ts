/**
 * @file globs constants
 */

export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)'
export const GLOB_SRC = '**/*.?([cm])[jt]s?(x)'

export const GLOB_JS = '**/*.?([cm])js'
export const GLOB_JSX = '**/*.?([cm])jsx'

export const GLOB_TS = '**/*.?([cm])ts'
export const GLOB_TSX = '**/*.?([cm])tsx'
export const GLOB_DTS = '**/*.d.?([cm])ts'

export const GLOB_TEST = '**/*.{test,spec}.?([cm])[jt]s?(x)'

export const GLOB_STYLE = '**/*.{c,le,sc}ss'
export const GLOB_CSS = '**/*.css'
export const GLOB_LESS = '**/*.less'
export const GLOB_SCSS = '**/*.scss'

export const GLOB_JSON = '**/*.json'
export const GLOB_JSON5 = '**/*.json5'
export const GLOB_JSONC = '**/*.jsonc'

export const GLOB_VUE = '**/*.vue'

export const GLOB_MARKDOWN = '**/*.md'
export const GLOB_YAML = '**/*.y?(a)ml'
export const GLOB_TOML = '**/*.toml'
export const GLOB_HTML = '**/*.htm?(l)'

export const GLOB_ALL_SRC = [
  GLOB_SRC,
  GLOB_STYLE,
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_MARKDOWN,
  GLOB_VUE,
  GLOB_YAML,
  GLOB_TOML,
  GLOB_HTML,
]

export const GLOB_NODE_MODULES = '**/node_modules/**'
export const GLOB_DIST = '**/dist/**'
export const GLOB_LOCKFILE = [
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',
  '**/deno.lock',
]
export const GLOB_EXCLUDE = [
  GLOB_NODE_MODULES,
  GLOB_DIST,
  ...GLOB_LOCKFILE,

  // Force lint
  '!.github',
  '!.vitepress',
  '!.vuepress',
  '!.vscode',

  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',

  // unplugin-auto-import
  '**/auto-import?(s).d.ts',
  // unplugin-vue-components
  '**/components.d.ts',
  // unplugin-vue-router
  '**/typed-router.d.ts',

  // vite-plugin-uni-pages
  '**/uni-pages.d.ts',

  '**/coverage',
  '**/fixtures',

  '**/output',
  '**/public',
  '**/static',

  // VitePress and VuePress
  '**/?(.)temp',
  '**/?(.)cache',

  '**/.eslintcache',
  '**/.stylelintcache',

  '**/.eslint-config-inspector',
  '**/.vite-inspect',
  '**/.nuxt',
  '**/.wxt',
  '**/.output',
  '**/.tsup',
  '**/.nitro',
  '**/.vercel',
  '**/.wrangler',
  '**/.changeset',
  '**/.npmrc',
  '**/.yarnrc',
]
