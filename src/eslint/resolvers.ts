/**
 * @file resolvers for `import-x`
 */

import { pluginImportX } from './plugins'

export { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

export const createNodeResolver = pluginImportX.createNodeResolver
