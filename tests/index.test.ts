import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { describe, expect, it } from 'vitest'
import { defineESLintConfig } from '../src'

describe('composer', () => {
  it('should return composer instance', () => {
    const config = defineESLintConfig()
    expect(config).toBeInstanceOf(FlatConfigComposer)
  })

  it.each([
    'clone',
    'remove',
    'append',
    'prepend',
    'replace',
    'override',
    'overrideRules',
    'renamePlugins',
  ])('should have method %s', method => {
    const config = defineESLintConfig()
    expect(config[method as keyof typeof config]).toBeInstanceOf(Function)
  })
})
