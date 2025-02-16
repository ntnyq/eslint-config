import { pluginDeMorgan } from '../eslint'
import type { OptionsOverrides, TypedConfigItem } from '../types'

/**
 * Options type of {@link configDeMorgan}
 */
export type ConfigDeMorganOptions = OptionsOverrides

/**
 * Config for optimize logic
 *
 * @see {@link https://github.com/azat-io/eslint-plugin-de-morgan}
 *
 * @param options - {@link ConfigDeMorganOptions}
 * @returns ESLint configs
 */
export const configDeMorgan = (
  options: ConfigDeMorganOptions = {},
): TypedConfigItem[] => [
  {
    ...pluginDeMorgan.configs.recommended,
    name: 'ntnyq/de-morgan',
    rules: {
      ...pluginDeMorgan.configs.recommended.rules,

      // Overrides rules
      ...options.overrides,
    },
  },
]
