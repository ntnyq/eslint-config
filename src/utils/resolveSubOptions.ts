import type { ResolvedOptions } from '../types'

export function resolveSubOptions<T extends Record<string, any>, K extends keyof T>(
  options: T,
  key: K,
): Partial<ResolvedOptions<T[K]>> {
  return typeof options[key] === 'boolean' ? {} : options[key] || {}
}
