import { ntnyq } from './dist/index.js'

export default ntnyq(
  [
    {
      ignores: ['**/types/typegen.d.ts'],
    },
  ],
  {
    vue: true,
    unocss: true,
  },
)
