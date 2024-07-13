import { interopDefault } from './interopDefault'

/**
 * Load an ESLint plugin by name.
 * @param name - The name of the plugin
 * @returns The plugin module
 */
export async function loadPlugin<T = unknown>(name: string): Promise<T> {
  const mod = await import(name).catch(err => {
    console.error(err)
    throw new Error(`Failed to load ESLint plugin '${name}'. Please install it!.`)
  })
  return interopDefault(mod) as Promise<T>
}
