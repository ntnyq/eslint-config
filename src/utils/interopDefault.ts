import type { Awaitable, InteropModuleDefault } from '../types'

/**
 * Interop default export from a module
 * @param mod - The module
 * @returns The default export
 */
export async function interopDefault<T>(mod: Awaitable<T>): Promise<InteropModuleDefault<T>> {
  const resolved = await mod
  return (resolved as any).default || resolved
}
