/**
 * @file resolvers for `import-x`
 */

import { pluginImportX } from './plugins'

/**
 * TypeScript resolver for 'import-x'
 */
export { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

/**
 * Built-in resolver of `import-x`
 */
export const createNodeResolver = pluginImportX.createNodeResolver
