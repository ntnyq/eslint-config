/**
 * @file config for plugin regexp
 * @see {@link https://github.com/ota-meshi/eslint-plugin-regexp}
 */

import { pluginRegexp } from '../eslint'
import type {
  ESLintRuleSeverity,
  OptionsOverrides,
  TypedConfigItem,
} from '../types'

/**
 * Options type of {@link configRegexp}
 */
export type ConfigRegexpOptions = OptionsOverrides & {
  /**
   * rule severity
   *
   * @default 'error'
   */
  severity?: ESLintRuleSeverity
}

/**
 * Config for regexp
 *
 * @see {@link https://github.com/ota-meshi/eslint-plugin-regexp}
 *
 * @param options - {@link ConfigRegexpOptions}
 * @returns ESLint configs
 */
export const configRegexp = (
  options: ConfigRegexpOptions = {},
): TypedConfigItem[] => {
  const recommendedConfig = pluginRegexp.configs[
    'flat/recommended'
  ] as TypedConfigItem

  const recommendedRules = {
    ...recommendedConfig.rules,
  }

  if (options.severity === 'warn') {
    for (const key in recommendedRules) {
      if (recommendedRules[key] === 'error') {
        recommendedRules[key] = 'warn'
      }
    }
  }

  return [
    {
      ...recommendedConfig,
      name: 'ntnyq/regexp',
      rules: {
        ...recommendedRules,

        // Overrides rules
        ...options.overrides,
      },
    },
  ]
}
