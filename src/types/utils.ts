/**
 * @file Type Utils
 */

import type { ParserOptions, TypedConfigItem } from './eslint'

export type Arrayable<T> = T | T[]

export type Awaitable<T> = T | Promise<T>

export type InteropModuleDefault<T> = T extends { default: infer U } ? U : T

export interface OverridesOptions<Rules = TypedConfigItem['rules']> {
  files?: TypedConfigItem['files']
  rules?: Rules
  parserOptions?: ParserOptions
}

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>
