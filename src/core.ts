/**
 * @file factory function to create ESLint config
 */

import { FlatConfigComposer } from 'eslint-flat-config-utils'
import {
  configAntfu,
  configAstro,
  configCommand,
  configDeMorgan,
  configDepend,
  configESLintComments,
  configESLintPlugin,
  configGitHubAction,
  configGitIgnore,
  configHtml,
  configIgnores,
  configImportX,
  configJavaScript,
  configJsdoc,
  configJsonc,
  configJSX,
  configMarkdown,
  configNode,
  configNtnyq,
  configPerfectionist,
  configPinia,
  configPnpm,
  configPrettier,
  configRegexp,
  configSort,
  configSpecials,
  configSvelte,
  configSVGO,
  configTest,
  configToml,
  configTypeScript,
  configUnicorn,
  configUnoCSS,
  configVue,
  configYml,
} from './configs'
import {
  getOverrides,
  hasPinia,
  hasTypeScript,
  hasUnoCSS,
  hasVitest,
  hasVue,
  resolveSubOptions,
} from './utils'
import type {
  Awaitable,
  ConfigNames,
  ConfigOptions,
  ESLintConfig,
  TypedConfigItem,
} from './types'

/**
 * Config factory
 */
// eslint-disable-next-line @typescript-eslint/promise-function-async
export function defineESLintConfig(
  options: ConfigOptions = {},
  ...userConfigs: Awaitable<
    TypedConfigItem | TypedConfigItem[] | ESLintConfig[]
  >[]
): FlatConfigComposer<TypedConfigItem, ConfigNames> {
  const {
    /**
     * Shareable options
     */
    shareable = {},

    /**
     * Conditional by deps
     */
    vue: enableVue = hasVue(),
    pinia: enablePinia = hasPinia(),
    test: enableTest = hasVitest(),
    unocss: enableUnoCSS = hasUnoCSS(),
    typescript: enableTypeScript = hasTypeScript(),

    /**
     * Enabled by default
     */
    yml: enableYML = true,
    sort: enableSort = true,
    toml: enableTOML = true,
    jsonc: enableJSONC = true,
    antfu: enableAntfu = true,
    ntnyq: enableNtnyq = true,
    depend: enableDepend = true,
    regexp: enableRegexp = true,
    unicorn: enableUnicorn = true,
    deMorgan: enableDeMorgan = true,
    prettier: enablePrettier = true,
    markdown: enableMarkdown = true,
    gitignore: enableGitIgnore = true,
    jsdoc: enableJsdoc = true,
    importX: enableImportX = true,
    specials: enableSpecials = true,
    githubAction: enableGitHubAction = true,
    perfectionist: enablePerfectionist = true,

    // disabled by default
    pnpm: enablePnpm = false,
    svgo: enableSVGO = false,
    html: enableHTML = false,
    astro: enableAstro = false,
    svelte: enableSvelte = false,
    eslintPlugin: enableESLintPlugin = false,
  } = options
  const configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[] = []
  const { ecmaVersion = 'latest', extraFileExtensions = [] } = shareable

  if (enableVue) {
    extraFileExtensions.push('.vue')
  }

  if (enableAstro) {
    extraFileExtensions.push('.astro')
  }

  if (enableSvelte) {
    extraFileExtensions.push('.svelte')
  }

  if (enableGitIgnore) {
    configs.push(configGitIgnore(resolveSubOptions(options, 'gitignore')))
  }

  configs.push(
    configIgnores(options.ignores),
    configJSX(),
    configNode({
      overrides: getOverrides(options, 'node'),
    }),
    configCommand(resolveSubOptions(options, 'command')),
    configESLintComments({
      overrides: getOverrides(options, 'eslintComments'),
    }),
    configJavaScript({
      ecmaVersion,
      ...resolveSubOptions(options, 'javascript'),
      overrides: getOverrides(options, 'javascript'),
    }),
  )

  if (enableImportX) {
    configs.push(
      configImportX({
        typescript: !!enableTypeScript,
        ...resolveSubOptions(options, 'importX'),
        overrides: getOverrides(options, 'importX'),
      }),
    )
  }

  if (enableJsdoc) {
    configs.push(
      configJsdoc({
        typescript: !!enableTypeScript,
        overrides: getOverrides(options, 'jsdoc'),
        ...resolveSubOptions(options, 'jsdoc'),
      }),
    )
  }

  if (enablePerfectionist) {
    configs.push(
      configPerfectionist({
        ...resolveSubOptions(options, 'perfectionist'),
        overrides: getOverrides(options, 'perfectionist'),
      }),
    )
  }

  if (enableUnicorn) {
    configs.push(
      configUnicorn({
        overrides: getOverrides(options, 'unicorn'),
      }),
    )
  }

  if (enablePinia) {
    configs.push(
      configPinia({
        ...resolveSubOptions(options, 'pinia'),
        overrides: getOverrides(options, 'pinia'),
      }),
    )
  }

  if (enableDeMorgan) {
    configs.push(
      configDeMorgan({
        overrides: getOverrides(options, 'deMorgan'),
      }),
    )
  }

  if (enableRegexp) {
    configs.push(
      configRegexp({
        ...resolveSubOptions(options, 'regexp'),
        overrides: getOverrides(options, 'regexp'),
      }),
    )
  }

  if (enableTypeScript) {
    configs.push(
      configTypeScript({
        ecmaVersion,
        ...resolveSubOptions(options, 'typescript'),
        overrides: getOverrides(options, 'typescript'),
        extraFileExtensions,
      }),
    )
  }

  if (enableVue) {
    configs.push(
      configVue({
        ecmaVersion,
        ...resolveSubOptions(options, 'vue'),
        typescript: !!enableTypeScript,
        overrides: getOverrides(options, 'vue'),
        extraFileExtensions,
      }),
    )
  }

  if (enableYML) {
    configs.push(
      configYml({
        prettier: !!enablePrettier,
        ...resolveSubOptions(options, 'yml'),
        overrides: getOverrides(options, 'yml'),
      }),
    )
  }

  if (enableTOML) {
    configs.push(
      configToml({
        ...resolveSubOptions(options, 'toml'),
        overrides: getOverrides(options, 'toml'),
      }),
    )
  }

  if (enableJSONC) {
    configs.push(
      configJsonc({
        prettier: !!enablePrettier,
        ...resolveSubOptions(options, 'jsonc'),
        overrides: getOverrides(options, 'jsonc'),
      }),
    )
  }

  if (enableAstro) {
    configs.push(
      configAstro({
        ...resolveSubOptions(options, 'astro'),
        typescript: !!enableTypeScript,
        overrides: getOverrides(options, 'astro'),
        extraFileExtensions,
      }),
    )
  }

  if (enableSvelte) {
    configs.push(
      configSvelte({
        ...resolveSubOptions(options, 'svelte'),
        typescript: !!enableTypeScript,
        overrides: getOverrides(options, 'svelte'),
        extraFileExtensions,
      }),
    )
  }

  if (enableSort) {
    configs.push(configSort(resolveSubOptions(options, 'sort')))
  }

  if (enableTest) {
    configs.push(
      configTest({
        ...resolveSubOptions(options, 'test'),
        overrides: getOverrides(options, 'test'),
      }),
    )
  }

  if (enableUnoCSS) {
    configs.push(
      configUnoCSS({
        overrides: getOverrides(options, 'unocss'),
      }),
    )
  }

  if (enableMarkdown) {
    configs.push(
      configMarkdown({
        ...resolveSubOptions(options, 'markdown'),
        overrides: getOverrides(options, 'markdown'),
        extraFileExtensions,
      }),
    )
  }

  if (enableAntfu) {
    configs.push(
      configAntfu({
        overrides: getOverrides(options, 'antfu'),
      }),
    )
  }

  if (enableDepend) {
    configs.push(
      configDepend({
        ...resolveSubOptions(options, 'depend'),
        overrides: getOverrides(options, 'depend'),
      }),
    )
  }

  if (enableNtnyq) {
    configs.push(
      configNtnyq({
        overrides: getOverrides(options, 'ntnyq'),
      }),
    )
  }

  if (enableGitHubAction) {
    configs.push(
      configGitHubAction({
        overrides: getOverrides(options, 'githubAction'),
      }),
    )
  }

  if (enableESLintPlugin) {
    configs.push(
      configESLintPlugin({
        overrides: getOverrides(options, 'eslintPlugin'),
      }),
    )
  }

  if (enablePnpm) {
    configs.push(configPnpm(resolveSubOptions(options, 'pnpm')))
  }

  if (enableSVGO) {
    configs.push(configSVGO(resolveSubOptions(options, 'svgo')))
  }

  if (enableHTML) {
    configs.push(
      configHtml({
        ...resolveSubOptions(options, 'html'),
        overrides: getOverrides(options, 'html'),
      }),
    )
  }

  if (enableSpecials) {
    configs.push(configSpecials(resolveSubOptions(options, 'specials')))
  }

  const prettierConfigs: TypedConfigItem[] = enablePrettier
    ? configPrettier({
        ...resolveSubOptions(options, 'prettier'),
        overrides: getOverrides(options, 'prettier'),
      })
    : []

  const composer: FlatConfigComposer<TypedConfigItem, ConfigNames> =
    new FlatConfigComposer<TypedConfigItem, ConfigNames>(
      ...configs,

      // User custom configs
      ...userConfigs,

      // Keep prettier and specials at last
      ...prettierConfigs,
    )

  return composer
}
