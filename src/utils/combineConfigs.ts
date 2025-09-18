/**
 * @copyright {@link https://github.com/antfu/eslint-config}
 */

import type { Awaitable, TypedConfigItem } from '../types'

export async function combineConfigs(
  ...configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[]
): Promise<TypedConfigItem[]> {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const resolved = await Promise.all(configs)
  return resolved.flat()
}
