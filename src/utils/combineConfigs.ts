/**
 * @copyright {@link https://github.com/antfu/eslint-config}
 */

import type { Awaitable, TypedConfigItem } from '../types'

export async function combineConfigs(
  ...configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[]
): Promise<TypedConfigItem[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}
