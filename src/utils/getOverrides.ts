import { resolveSubOptions } from './resolveSubOptions'
import type {
  ConfigOptions,
  ResolvedOptions,
  RuleOptions,
  TypedConfigItem,
} from '../types'

/**
 * Read rule overrides from a config sub-option.
 *
 * @param options - Top-level config options.
 * @param key - Sub-option key to read.
 * @returns Rule override map when provided, otherwise an empty object.
 */
export function getOverrides<K extends keyof ConfigOptions>(
  options: ConfigOptions,
  key: K,
): Partial<TypedConfigItem['rules'] & RuleOptions> {
  const subOptions: Partial<ResolvedOptions<ConfigOptions[K]>> =
    resolveSubOptions(options, key)
  return 'overrides' in subOptions && subOptions.overrides
    ? subOptions.overrides
    : {}
}
