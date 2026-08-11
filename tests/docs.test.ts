import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const CONFIGS_DIR = path.resolve(import.meta.dirname, '../docs/configs')

describe('documentation', () => {
  it('should list every config page in the config matrix', () => {
    const configPageSlugs = fs
      .readdirSync(CONFIGS_DIR)
      .filter(file => file.endsWith('.md') && file !== 'index.md')
      .map(file => file.replace(/\.md$/, ''))
      .sort()
    const matrix = fs.readFileSync(path.join(CONFIGS_DIR, 'index.md'), 'utf8')
    const matrixSlugs = [
      ...new Set(
        Array.from(matrix.matchAll(/\]\(\.\/([^)]+)\)/g), match => match[1]),
      ),
    ].sort()

    expect(matrixSlugs).toEqual(configPageSlugs)
  })
})
