import { ntnyq } from './dist/index.js'

export default ntnyq(
  [
    {
      ignores: ['**/types/typegen.ts'],
    },
  ],
  {
    vue: true,
    unocss: true,
  },
)
