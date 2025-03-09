import process from 'node:process'

const CHECKED_RUNNER_PACKAGES: string[] = [
  'nano-staged',
  'lint-staged',
  'lefthook',
  'tsx',
]

export function isInGitHooksOrRunBySpecifyPackages(): boolean {
  return !!(
    process.env.GIT_PARAMS
    || process.env.VSCODE_GIT_COMMAND
    || CHECKED_RUNNER_PACKAGES.some(packageName =>
      process.env.npm_lifecycle_script?.startsWith(packageName),
    )
  )
}
