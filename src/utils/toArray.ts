import type { Arrayable } from '../types'

export function toArray<T>(val?: Arrayable<T>) {
  val = val ?? []
  return Array.isArray(val) ? val : [val]
}
