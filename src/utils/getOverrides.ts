import { resolveSubOptions } from './resolveSubOptions'
import type { ConfigOptions, RuleOptions, TypedConfigItem } from '../types'

export function getOverrides<K extends keyof ConfigOptions>(
  options: ConfigOptions,
  key: K,
): Partial<TypedConfigItem['rules'] & RuleOptions> {
  const sub = resolveSubOptions(options, key)
  return 'overrides' in sub && sub.overrides ? sub.overrides : {}
}
