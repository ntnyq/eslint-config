import { Linter } from 'eslint'
import { describe, expect, it } from 'vitest'
import { configVue, defineESLintConfig } from '../src'

describe('Vue perfectionist integration', () => {
  const linter = new Linter()

  it.each([undefined, false])(
    'should omit perfectionist plugins and rules when set to %s',
    async vuePerfectionist => {
      const configs = configVue({ vuePerfectionist })
      const composedConfigs = await defineESLintConfig({
        vue: { vuePerfectionist },
        oxfmt: true,
      })

      for (const items of [configs, composedConfigs]) {
        expect(
          items.some(config => !!config.plugins?.['vue-perfectionist']),
        ).toBe(false)
        expect(
          items.some(config =>
            Object.keys(config.rules ?? {}).some(rule =>
              rule.startsWith('vue-perfectionist/'),
            ),
          ),
        ).toBe(false)
      }

      const messages = linter.verify(
        '<template><div ref="input" :title="a && b && c && d" /></template>',
        configs,
        { filename: 'Component.vue' },
      )

      expect(messages.some(message => message.fatal)).toBe(false)
      expect(
        messages.some(message =>
          message.ruleId?.startsWith('vue-perfectionist/'),
        ),
      ).toBe(false)
    },
  )

  it.each([true, {}])(
    'should enable perfectionist with %j',
    vuePerfectionist => {
      const messages = linter.verify(
        '<template><div ref="input" /></template>',
        configVue({ vuePerfectionist }),
        { filename: 'Component.vue' },
      )

      expect(messages.some(message => message.fatal)).toBe(false)
      expect(messages).toContainEqual(
        expect.objectContaining({
          ruleId: 'vue-perfectionist/prefer-ref-pattern',
        }),
      )
    },
  )

  it('should scope branch overrides to its files and preserve base Vue rules', () => {
    const configs = configVue({
      vuePerfectionist: {
        files: ['components/**/*.vue'],
        overrides: {
          'vue-perfectionist/prefer-ref-pattern': 'warn',
        },
      },
    })
    const code = '<template><div ref="input" v-text="value" /></template>'
    const included = linter.verify(code, configs, {
      filename: 'components/Example.vue',
    })
    const excluded = linter.verify(code, configs, {
      filename: 'pages/Example.vue',
    })

    expect(included).toContainEqual(
      expect.objectContaining({
        ruleId: 'vue-perfectionist/prefer-ref-pattern',
        severity: 1,
      }),
    )
    expect(
      excluded.some(message =>
        message.ruleId?.startsWith('vue-perfectionist/'),
      ),
    ).toBe(false)
    for (const messages of [included, excluded]) {
      expect(messages.some(message => message.fatal)).toBe(false)
      expect(messages).toContainEqual(
        expect.objectContaining({ ruleId: 'vue/no-v-text', severity: 2 }),
      )
    }
  })

  it.each([
    {
      rule: 'callback-style',
      code: `<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => console.log('mounted'))
</script>`,
    },
    {
      rule: 'define-macros-newline',
      code: `<script setup lang="ts">
defineProps<{ title: string }>()
</script>`,
    },
    {
      rule: 'prefer-ref-pattern',
      code: `<template><div ref="input" /></template>`,
    },
    {
      rule: 'sort-script-setup',
      code: `<script setup lang="ts">
function getTitle() { return 'title' }
const title = 'title'
</script>`,
    },
  ])('should report $rule in Vue files', ({ code, rule }) => {
    const messages = linter.verify(
      code,
      configVue({ typescript: true, vuePerfectionist: true }),
      {
        filename: 'Component.vue',
      },
    )

    expect(messages.some(message => message.fatal)).toBe(false)
    expect(messages).toContainEqual(
      expect.objectContaining({
        ruleId: `vue-perfectionist/${rule}`,
        severity: 2,
      }),
    )
  })

  it.each([
    {
      code: '<template><div v-if="a && b && c" /></template>',
      count: 0,
    },
    {
      code: '<template><div v-if="a && b && c && d" /></template>',
      count: 1,
    },
    {
      code: '<template><span>{{ ready ? label : fallback }}</span></template>',
      count: 0,
    },
    {
      code: '<template><span>{{ pending ? loading : failed ? error : done }}</span></template>',
      count: 1,
    },
  ])(
    'should report $count complex template expressions in $code',
    ({ code, count }) => {
      const messages = linter.verify(
        code,
        configVue({ vuePerfectionist: true }),
        { filename: 'Component.vue' },
      )
      const complexityMessages = messages.filter(
        message =>
          message.ruleId === 'vue-perfectionist/no-complex-template-expression',
      )

      expect(messages.some(message => message.fatal)).toBe(false)
      expect(complexityMessages).toHaveLength(count)
      for (const message of complexityMessages) {
        expect(message.severity).toBe(2)
      }
    },
  )

  it('should allow overriding template complexity limits', () => {
    const messages = linter.verify(
      '<template><div v-if="a && b && c && d" /></template>',
      configVue({
        vuePerfectionist: {
          overrides: {
            'vue-perfectionist/no-complex-template-expression': [
              'error',
              { maxLogicalExpressions: 3 },
            ],
          },
        },
      }),
      { filename: 'Component.vue' },
    )

    expect(messages.some(message => message.fatal)).toBe(false)
    expect(
      messages.some(
        message =>
          message.ruleId === 'vue-perfectionist/no-complex-template-expression',
      ),
    ).toBe(false)
  })

  it.each([
    { flush: 'post', alias: 'watchPostEffect' },
    { flush: 'sync', alias: 'watchSyncEffect' },
  ])('should report and fix $flush watch effects', ({ alias, flush }) => {
    const configs = configVue({ typescript: true, vuePerfectionist: true })
    const code = `<script setup lang="ts">
import { watchEffect } from 'vue'

watchEffect(() => {}, { flush: '${flush}' })
</script>`
    const messages = linter.verify(code, configs, { filename: 'Component.vue' })
    const result = linter.verifyAndFix(code, configs, {
      filename: 'Component.vue',
    })

    expect(messages).toContainEqual(
      expect.objectContaining({
        ruleId: 'vue-perfectionist/prefer-watch-effect-alias',
        severity: 2,
      }),
    )
    expect(result.fixed).toBe(true)
    expect(result.messages).toEqual([])
    expect(result.output).toContain(`${alias}(() => {})`)
    expect(result.output).not.toContain(`flush: '${flush}'`)
    expect(
      linter.verifyAndFix(result.output, configs, {
        filename: 'Component.vue',
      }).fixed,
    ).toBe(false)
  })

  it.each([false, true])(
    'should respect autoImport %s for watch effect aliases',
    autoImport => {
      const messages = linter.verify(
        `<script setup lang="ts">
watchEffect(updateLayout, { flush: 'post' })
</script>`,
        configVue({ typescript: true, vuePerfectionist: { autoImport } }),
        { filename: 'Component.vue' },
      )

      expect(messages.some(message => message.fatal)).toBe(false)
      expect(
        messages.some(
          message =>
            message.ruleId === 'vue-perfectionist/prefer-watch-effect-alias',
        ),
      ).toBe(autoImport)
    },
  )

  it.each([
    { overrides: {}, severity: 1 },
    {
      overrides: { 'vue-perfectionist/prefer-define-model': 'error' as const },
      severity: 2,
    },
  ])(
    'should report model migration with severity $severity without rewriting contracts',
    ({ overrides, severity }) => {
      const configs = configVue({
        typescript: true,
        vuePerfectionist: { overrides },
      })
      const code = `<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <input :value="props.modelValue" @input="emit('update:modelValue', 'value')" />
</template>`
      const result = linter.verifyAndFix(code, configs, {
        filename: 'Component.vue',
      })

      expect(result.messages.some(message => message.fatal)).toBe(false)
      expect(result.messages).toContainEqual(
        expect.objectContaining({
          ruleId: 'vue-perfectionist/prefer-define-model',
          severity,
        }),
      )
      expect(result.output).toContain('defineProps<')
      expect(result.output).toContain('modelValue: string')
      expect(result.output).toContain('defineEmits<')
      expect(result.output).toContain("'update:modelValue': [value: string]")
      expect(result.output).not.toContain('defineModel')
    },
  )

  it('should fix script ordering without conflicting with Vue macro ordering', () => {
    const configs = configVue({ typescript: true, vuePerfectionist: true })
    const code = `<script setup lang="ts">
defineOptions({ name: 'Example' })
defineProps<{ title: string }>()
const emit = defineEmits<{ change: [value: string] }>()
defineSlots<{ default: () => unknown }>()
defineModel<string>()
const exposedValue = 'title'
defineExpose({ exposedValue })
</script>
<template><div @click="emit('change', title)" /></template>`
    const result = linter.verifyAndFix(code, configs, {
      filename: 'Component.vue',
    })

    expect(result.fixed).toBe(true)
    expect(result.messages).toEqual([])
    expect(result.output.indexOf('defineProps')).toBeLessThan(
      result.output.indexOf('defineEmits'),
    )
    expect(result.output.indexOf('defineEmits')).toBeLessThan(
      result.output.indexOf('defineOptions'),
    )
    expect(result.output.indexOf('const exposedValue')).toBeLessThan(
      result.output.indexOf('defineExpose'),
    )
    expect(
      linter.verifyAndFix(result.output, configs, {
        filename: 'Component.vue',
      }).fixed,
    ).toBe(false)
  })

  it('should respect custom file patterns without linting plain scripts', () => {
    const configs = configVue({
      files: ['components/**/*.vue'],
      vuePerfectionist: true,
    })
    const code = '<template><div ref="input" /></template>'
    const included = linter.verify(code, configs, {
      filename: 'components/Example.vue',
    })
    const excluded = linter.verify(code, configs, {
      filename: 'pages/Example.vue',
    })
    const script = linter.verify(
      "import { onMounted } from 'vue'\nonMounted(() => console.log('mounted'))",
      configs,
      { filename: 'example.js' },
    )

    expect(included).toContainEqual(
      expect.objectContaining({
        ruleId: 'vue-perfectionist/prefer-ref-pattern',
      }),
    )
    expect(excluded.some(message => message.ruleId)).toBe(false)
    expect(script).toEqual([])
  })

  it('should omit the plugin when Vue is disabled', async () => {
    const configs = await defineESLintConfig({ vue: false })

    expect(configs.some(config => config.plugins?.['vue-perfectionist'])).toBe(
      false,
    )
  })
})
