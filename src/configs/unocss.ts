import { pluginUnoCSS } from '../eslint'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configUnoCSS}
 */
export type ConfigUnoCSSOptions = OptionsOverrides & {
  /**
   * Enable attributify sort order
   *
   * @default false
   */
  attributify?: boolean
}

/**
 * Config for UnoCSS
 *
 * @see {@link https://github.com/unocss/unocss/tree/main/packages-integrations/eslint-plugin}
 *
 * @param options - {@link ConfigUnoCSSOptions}
 * @returns ESLint configs
 */
export const configUnoCSS = (
  options: ConfigUnoCSSOptions = {},
): TypedConfigItem[] => [
  {
    name: 'ntnyq/unocss',
    plugins: {
      unocss: pluginUnoCSS,
    },
    rules: {
      'unocss/order-attributify': options.attributify ? 'error' : 'off',
      'unocss/order': 'error',

      // Overrides rules
      ...options.overrides,
    },
  },
]
