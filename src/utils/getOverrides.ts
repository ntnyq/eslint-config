import { resolveSubOptions } from './resolveSubOptions'
import type {
  ConfigOptions,
  ResolvedOptions,
  RuleOptions,
  TypedConfigItem,
} from '../types'

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
