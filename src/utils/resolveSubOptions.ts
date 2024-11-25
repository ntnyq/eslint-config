import type { ConfigOptions, ResolvedOptions } from '../types'

export function resolveSubOptions<K extends keyof ConfigOptions>(
  options: ConfigOptions,
  key: K,
): ResolvedOptions<ConfigOptions[K]> {
  // TODO: fix unsafe-any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return typeof options[key] === 'boolean' ? ({} as any) : options[key] || {}
}
