/**
 * @file Type Utils
 */

export type Arrayable<T> = T | T[]

export type Awaitable<T> = T | Promise<T>

export type InteropModuleDefault<T> = T extends { default: infer U } ? U : T

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>
