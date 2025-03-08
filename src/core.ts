/**
 * @file factory function to create ESLint config
 */

import { FlatConfigComposer } from 'eslint-flat-config-utils'
import {
  configAntfu,
  configCommand,
  configDeMorgan,
  configDepend,
  configESLintComments,
  configESLintPlugin,
  configGitHubAction,
  configGitIgnore,
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
    githubAction: enableGitHubAction = true,
    perfectionist: enablePerfectionist = true,

    // disabled by default
    pnpm: enablePnpm = false,
    svgo: enableSVGO = false,
    eslintPlugin: enableESLintPlugin = false,
  } = options
  const configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[] = []
  const { extraFileExtensions = [] } = shareable

  if (enableVue) {
    extraFileExtensions.push('.vue')
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
    configImportX({
      ...resolveSubOptions(options, 'importX'),
      typescript: !!enableTypeScript,
      overrides: getOverrides(options, 'importX'),
    }),
    configJsdoc({
      typescript: !!enableTypeScript,
      overrides: getOverrides(options, 'jsdoc'),
      ...resolveSubOptions(options, 'jsdoc'),
    }),
    configESLintComments({
      overrides: getOverrides(options, 'eslintComments'),
    }),
    configJavaScript({
      ...resolveSubOptions(options, 'javascript'),
      overrides: getOverrides(options, 'javascript'),
    }),
  )

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
        ...resolveSubOptions(options, 'typescript'),
        overrides: getOverrides(options, 'typescript'),
        extraFileExtensions,
      }),
    )
  }

  if (enableVue) {
    configs.push(
      configVue({
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
        ...resolveSubOptions(options, 'jsonc'),
        overrides: getOverrides(options, 'jsonc'),
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
    configs.push(
      configPnpm({
        ...resolveSubOptions(options, 'pnpm'),
        overrides: getOverrides(options, 'pnpm'),
      }),
    )
  }

  if (enableSVGO) {
    configs.push(configSVGO(resolveSubOptions(options, 'svgo')))
  }

  const specialsConfigs: TypedConfigItem[] = configSpecials(
    resolveSubOptions(options, 'specials'),
  )

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
      ...specialsConfigs,
      ...prettierConfigs,
    )

  return composer
}
