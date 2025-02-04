/**
 * @file factory function to create ESLint config
 */

import { FlatConfigComposer } from 'eslint-flat-config-utils'
import {
  configAntfu,
  configCommand,
  configComments,
  configDepend,
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
  configVitest,
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
import type { Awaitable, ConfigNames, ConfigOptions, ESLintConfig, TypedConfigItem } from './types'

/**
 * Config factory
 */
// eslint-disable-next-line @typescript-eslint/promise-function-async
export function defineESLintConfig(
  options: ConfigOptions = {},
  ...userConfigs: Awaitable<TypedConfigItem | TypedConfigItem[] | ESLintConfig[]>[]
): FlatConfigComposer<TypedConfigItem, ConfigNames> {
  const {
    /**
     * Shared options
     */
    extensions: supportedExtensions = [],

    /**
     * Conditional by deps
     */
    vue: enableVue = hasVue,
    pinia: enablePinia = hasPinia,
    test: enableTest = hasVitest,
    unocss: enableUnoCSS = hasUnoCSS,
    typescript: enableTypeScript = hasTypeScript,

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
    prettier: enablePrettier = true,
    markdown: enableMarkdown = true,
    gitignore: enableGitIgnore = true,
    githubAction: enableGitHubAction = true,
    perfectionist: enablePerfectionist = true,

    // disabled by default
    svgo: enableSVGO = false,
    eslintPlugin: enableESLintPlugin = false,
  } = options
  const configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[] = []

  if (enableVue) {
    supportedExtensions.push('vue')
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
    configComments({
      overrides: getOverrides(options, 'comments'),
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
        extensions: supportedExtensions,
        overrides: getOverrides(options, 'typescript'),
      }),
    )
  }

  if (enableVue) {
    configs.push(
      configVue({
        ...resolveSubOptions(options, 'vue'),
        typescript: !!enableTypeScript,
        overrides: getOverrides(options, 'vue'),
      }),
    )
  }

  if (enableYML) {
    configs.push(
      configYml({
        overrides: getOverrides(options, 'yml'),
      }),
    )
  }

  if (enableTOML) {
    configs.push(
      configToml({
        overrides: getOverrides(options, 'toml'),
      }),
    )
  }

  if (enableJSONC) {
    configs.push(
      configJsonc({
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
        overrides: getOverrides(options, 'test'),
      }),
      configVitest({
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
        extensions: supportedExtensions,
        overrides: getOverrides(options, 'markdown'),
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

  if (enableSVGO) {
    configs.push(configSVGO(resolveSubOptions(options, 'svgo')))
  }

  const specialsConfigs = configSpecials(resolveSubOptions(options, 'specials'))

  const prettierConfigs = enablePrettier
    ? configPrettier({
        ...resolveSubOptions(options, 'prettier'),
        overrides: getOverrides(options, 'prettier'),
      })
    : []

  const composer = new FlatConfigComposer<TypedConfigItem, ConfigNames>(
    ...configs,

    // User custom configs
    ...userConfigs,

    // Keep prettier and specials at last
    ...specialsConfigs,
    ...prettierConfigs,
  )

  return composer
}
