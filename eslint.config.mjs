import { ntnyq } from './dist/index.js'

export default ntnyq(
  [
    {
      name: 'ntnyq/workspace/ignore',
      ignores: ['**/types/typegen.ts'],
    },
  ],
  {
    vue: true,
    unocss: true,
    vitest: true,
  },
)
