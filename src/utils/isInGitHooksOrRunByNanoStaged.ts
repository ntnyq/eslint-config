import process from 'node:process'

export function isInGitHooksOrRunByNanoStaged(): boolean {
  return !!(
    process.env.GIT_PARAMS ||
    process.env.VSCODE_GIT_COMMAND ||
    process.env.npm_lifecycle_script?.startsWith('nano-staged')
  )
}
