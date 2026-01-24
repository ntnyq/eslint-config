/**
 * @file globs constants
 */

export const GLOB_SRC_EXT: string = '?([cm])[jt]s?(x)'
export const GLOB_SRC: string = `**/*.${GLOB_SRC_EXT}`

export const GLOB_JS: string = '**/*.?([cm])js'
export const GLOB_JSX: string = `${GLOB_JS}x`
export const GLOB_JSX_ONLY: string = '**/*.jsx'

export const GLOB_TS: string = '**/*.?([cm])ts'
export const GLOB_TSX: string = `${GLOB_TS}x`
export const GLOB_TSX_ONLY: string = '**/*.tsx'
export const GLOB_DTS: string = '**/*.d.?([cm])ts'

export const GLOB_TYPES: string[] = [
  GLOB_DTS,
  `**/types/${GLOB_TS}`,
  `**/types.ts`,
]

export const GLOB_TYPE_TEST: string[] = [
  `**/*.test-d.${GLOB_SRC_EXT}`,
  `**/*.spec-d.${GLOB_SRC_EXT}`,
]
export const GLOB_TEST: string[] = [
  `**/*.test.${GLOB_SRC_EXT}`,
  `**/*.spec.${GLOB_SRC_EXT}`,
  `**/*.bench.${GLOB_SRC_EXT}`,
  `**/*.benchmark.${GLOB_SRC_EXT}`,
  ...GLOB_TYPE_TEST,
]

export const GLOB_STYLE: string = '**/*.{c,le,sc}ss'
export const GLOB_CSS: string = '**/*.css'
export const GLOB_LESS: string = '**/*.less'
export const GLOB_SCSS: string = '**/*.scss'
export const GLOB_POSTCSS: string = '**/*.{p,post}css'

export const GLOB_JSON: string = '**/*.json'
export const GLOB_JSON5: string = '**/*.json5'
export const GLOB_JSONC: string = '**/*.jsonc'
export const GLOB_PACKAGE_JSON: string = '**/package.json'
export const GLOB_JSON_SCHEMA: string[] = [
  '**/*.schema.json',
  '**/schemas/*.json',
]
export const GLOB_TSCONFIG_JSON: string[] = [
  '**/tsconfig.json',
  '**/tsconfig.*.json',
]

export const GLOB_YAML: string = '**/*.y?(a)ml'
export const GLOB_PNPM_WORKSPACE_YAML: string = '**/pnpm-workspace.yaml'

export const GLOB_SVG: string = '**/*.svg'
export const GLOB_VUE: string = '**/*.vue'
export const GLOB_SVELTE: string = '**/*.svelte?(.{js,ts})'
export const GLOB_TOML: string = '**/*.toml'
export const GLOB_HTML: string = '**/*.htm?(l)'
export const GLOB_ASTRO: string = '**/*.astro'
export const GLOB_ASTRO_TS: string = '**/*.astro/*.ts'

export const GLOB_MARKDOWN: string = '**/*.md'
export const GLOB_MARKDOWN_CODE: string = `${GLOB_MARKDOWN}/${GLOB_SRC}`
export const GLOB_MARKDOWN_NESTED: string = `${GLOB_MARKDOWN}/*.md`

export const GLOB_SRC_EXTENSIONS: string[] = [
  GLOB_STYLE,
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_YAML,
  GLOB_TOML,
  GLOB_HTML,
  GLOB_MARKDOWN,
]
export const GLOB_ALL_SRC: string[] = [
  GLOB_SRC,
  GLOB_VUE,
  ...GLOB_SRC_EXTENSIONS,
]

export const GLOB_PINIA_STORE: string = `**/store?(s)/*.${GLOB_SRC_EXT}`
export const GLOB_GITHUB_ACTION: string = '**/.github/workflows/*.y?(a)ml'

export const GLOB_NODE_MODULES: string = '**/node_modules/**'
export const GLOB_DIST: string = '**/dist/**'
export const GLOB_LOCKFILE: string[] = [
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lock?(b)',
  '**/deno.lock',
]
export const GLOB_EXCLUDE: string[] = [
  GLOB_NODE_MODULES,
  GLOB_DIST,
  ...GLOB_LOCKFILE,

  '**/.pnpm-store/**',

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
  // vue-router v5
  '**/routes.d.ts',

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
  '**/.husky',

  // tauri
  '**/src-tauri/gen',
  '**/src-tauri/target',
]
