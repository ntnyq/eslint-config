import type { FlatESLintConfig } from 'eslint-define-config'

// Config
export type ts = FlatESLintConfig[]
export type yml = FlatESLintConfig[]
export type vue = FlatESLintConfig[]
export type astro = FlatESLintConfig[]
export type prettier = FlatESLintConfig[]
export type markdown = FlatESLintConfig[]
export type jsonc = FlatESLintConfig[]
export type pkgOrder = FlatESLintConfig[]
export type imports = FlatESLintConfig[]
export type js = FlatESLintConfig[]
export type jsx = FlatESLintConfig[]
export type unicorn = FlatESLintConfig[]
export type eslintComments = FlatESLintConfig[]

// Presets
export type basic = FlatESLintConfig[]

export type all = FlatESLintConfig[]

export type ntnyq = (
  config?: FlatESLintConfig[],
  options?: { vue?: boolean; prettier?: boolean; typescript?: boolean },
) => FlatESLintConfig[]
