import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],

  presets: [
    presetWind3(),
    presetIcons({
      autoInstall: true,
      extraProperties: {},
      scale: 1.2,
    }),
  ],

  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex-center flex-col',
      'wh-full': 'w-full h-full',
    },
  ],

  theme: {
    colors: {},
  },
})
