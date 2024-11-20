/**
 * @file Merge prettier options
 */

import type { PrettierOptions } from '../types'

export function mergePrettierOptions(
  options: PrettierOptions = {},
  overrides: PrettierOptions = {},
) {
  const result: PrettierOptions = {
    ...options,
    ...overrides,
    plugins: [
      // built-in plugins
      ...(options.plugins || []),

      // custom plugins
      ...(overrides.plugins || []),
    ],
  }
  return result
}
