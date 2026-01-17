/**
 * @file Type Utils
 */

/**
 * Array or not
 */
export type Arrayable<T> = T | T[]

/**
 * Promise or not
 */
export type Awaitable<T> = Promise<T> | T

/**
 * Non-empty array
 */
export type NonEmptyArray<T> = [T, ...T[]]

/**
 * Make types human readable
 */
export type InteropModuleDefault<T> = T extends { default: infer U } ? U : T

export type Pretty<T> = {
  [P in keyof T]: T[P]
} & {}

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>
