import { ntnyq } from './dist/index.js'

export default ntnyq({
  ignores: ['**/types/typegen.ts'],
  vue: true,
  typescript: true,
  unocss: true,
  vitest: true,
})
