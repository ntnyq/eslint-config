declare module 'eslint-plugin-es-x' {
  import type { ESLint, Linter } from 'eslint'

  type EsXConfigNames =
    | 'no-array-grouping'
    | 'no-change-array-by-copy'
    | 'no-class-fields'
    | 'no-import-attributes'
    | 'no-intl-numberformat-v3'
    | 'no-is-usv-string'
    | 'no-iterator-helpers'
    | 'no-new-in-es2015'
    | 'no-new-in-es2016-intl-api'
    | 'no-new-in-es2016'
    | 'no-new-in-es2017-intl-api'
    | 'no-new-in-es2017'
    | 'no-new-in-es2018-intl-api'
    | 'no-new-in-es2018'
    | 'no-new-in-es2019'
    | 'no-new-in-es2020-intl-api'
    | 'no-new-in-es2020'
    | 'no-new-in-es2021-intl-api'
    | 'no-new-in-es2021'
    | 'no-new-in-es2022-intl-api'
    | 'no-new-in-es2022'
    | 'no-new-in-es2023-intl-api'
    | 'no-new-in-es2023'
    | 'no-new-in-es2024'
    | 'no-new-in-es5'
    | 'no-new-in-esnext'
    | 'no-relative-indexing-method'
    | 'no-set-methods'
    | 'restrict-to-es-intl-api-1st-edition'
    | 'restrict-to-es2015-intl-api'
    | 'restrict-to-es2015'
    | 'restrict-to-es2016-intl-api'
    | 'restrict-to-es2016'
    | 'restrict-to-es2017-intl-api'
    | 'restrict-to-es2017'
    | 'restrict-to-es2018-intl-api'
    | 'restrict-to-es2018'
    | 'restrict-to-es2019-intl-api'
    | 'restrict-to-es2019'
    | 'restrict-to-es2020-intl-api'
    | 'restrict-to-es2020'
    | 'restrict-to-es2021-intl-api'
    | 'restrict-to-es2021'
    | 'restrict-to-es2022-intl-api'
    | 'restrict-to-es2022'
    | 'restrict-to-es2023-intl-api'
    | 'restrict-to-es2023'
    | 'restrict-to-es3'
    | 'restrict-to-es5'

  declare const plugin: {
    rules: NonNullable<ESLint.Plugin['rules']>
    configs: {
      [Name in EsXConfigNames]: Linter.Config
    }
  }
  export = plugin
}
