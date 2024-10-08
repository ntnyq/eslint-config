/**
 * @file Type Utils
 */

export type Arrayable<T> = T | T[]

export type Awaitable<T> = T | Promise<T>

/**
 * A literal type that supports custom further strings but preserves autocompletion in IDEs.
 *
 * @see https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609
 */
export type LiteralUnion<Union extends Base, Base = string> =
  | Union
  | (Base & { zz_IGNORE_ME?: never })

export type InteropModuleDefault<T> = T extends { default: infer U } ? U : T

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>
