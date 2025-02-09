// @ts-check

import { config, defineConfig } from '@ntnyq/prettier-config'

export default defineConfig({
  ...config,

  // TODO: delete next line after @ntnyq/prettier-config next version
  experimentalTernaries: false,

  overrides: [
    {
      files: ['**/*.css', '**/*.scss'],
      options: {
        singleQuote: false,
      },
    },
  ],
})
