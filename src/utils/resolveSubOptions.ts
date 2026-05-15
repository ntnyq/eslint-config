import type { ResolvedOptions } from '../types'

/**
 * Normalize a sub-option value to an object.
 *
 * Boolean `true` means enabled with default options and returns an empty
 * object; falsy values also fall back to an empty object.
 *
 * @param options - Options object that contains sub-options.
 * @param key - Sub-option key to resolve.
 * @returns Normalized sub-options object.
 */
export function resolveSubOptions<
  T extends Record<string, any>,
  K extends keyof T,
>(options: T, key: K): Partial<ResolvedOptions<T[K]>> {
  return typeof options[key] === 'boolean' ? {} : options[key] || {}
}
