import type { ConfigOptions, ResolvedOptions } from '../types'

export function resolveSubOptions<K extends keyof ConfigOptions>(
  options: ConfigOptions,
  key: K,
): ResolvedOptions<ConfigOptions[K]> {
  return typeof options[key] === 'boolean' ? ({} as any) : options[key] || {}
}
