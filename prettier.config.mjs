// @ts-check

import { config, defineConfig } from '@ntnyq/prettier-config'

export default defineConfig({
  ...config,

  overrides: [
    {
      files: ['**/*.css'],
      options: {
        singleQuote: false,
      },
    },
  ],
})
