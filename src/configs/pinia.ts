import { pluginPinia } from '../eslint'
import { GLOB_PINIA_STORE } from '../globs'
import type { ConfigPiniaOptions, TypedConfigItem } from '../types'

export const configPinia = (
  options: ConfigPiniaOptions = {},
): TypedConfigItem[] => {
  const { files = [GLOB_PINIA_STORE] } = options

  return [
    {
      name: 'ntnyq/pinia',
      files,
      plugins: {
        pinia: pluginPinia,
      },
      rules: {
        'pinia/never-export-initialized-store': 'error',
        'pinia/no-duplicate-store-ids': 'error',
        'pinia/no-return-global-properties': 'error',
        'pinia/no-store-to-refs-in-store': 'error',
        'pinia/prefer-single-store-per-file': 'error',
        'pinia/prefer-use-store-naming-convention': [
          'error',
          {
            checkStoreNameMismatch: true,
            storeSuffix: 'Store',
          },
        ],
        'pinia/require-setup-store-properties-export': 'error',

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
