import { resolveSubOptions } from './resolveSubOptions'
import type { ConfigOptions, RuleOptions, RuleRecord } from '../types'

export function getOverrides<K extends keyof ConfigOptions>(
  options: ConfigOptions,
  key: K,
): Partial<RuleRecord & RuleOptions> {
  const sub = resolveSubOptions(options, key)
  return 'overrides' in sub && sub.overrides ? sub.overrides : {}
}
