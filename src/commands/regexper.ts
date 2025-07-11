import { defineCommand } from 'eslint-plugin-command/commands'
import type { Command, Tree } from 'eslint-plugin-command/types'

export const regexper: Command = defineCommand({
  name: 'regexper',
  // @regexper https://regexper.com/#%2F(%5Cb%7C%5Cs%7C%5E)(%40regexper)(%5Cs%5CS%2B)%3F(%5Cb%7C%5Cs%7C%24)%2F
  match: /(\b|\s|^)(@regexper)(\s\S+)?(\b|\s|$)/,
  action(ctx) {
    const literal: Tree.RegExpLiteral | undefined = ctx.findNodeBelow(
      node => node.type === 'Literal' && 'regex' in node,
    ) as Tree.RegExpLiteral | undefined

    if (!literal) {
      return ctx.reportError('Unable to find a regexp literal to generate')
    }

    const [
      // non-use
      _fullStr = '',
      spaceBefore = '',
      commandStr = '',
      existingUrl = '',
      // non-use
      _spaceAfter = '',
    ] = ctx.matches as string[]

    const url = `https://regexper.com/#${encodeURIComponent(literal.raw)}`

    if (existingUrl.trim() === url.trim()) {
      return
    }

    const indexStart =
      ctx.comment.range[0]
      + ctx.matches.index!
      + spaceBefore.length
      + 2 /** comment prefix */
    const indexEnd = indexStart + commandStr.length + existingUrl.length

    ctx.report({
      loc: {
        start: ctx.source.getLocFromIndex(indexStart),
        end: ctx.source.getLocFromIndex(indexEnd),
      },
      removeComment: false,
      message: 'Update the regexper link',
      fix(fixer) {
        return fixer.replaceTextRange(
          [indexStart, indexEnd],
          `@regexper ${url}`,
        )
      },
    })
  },
})
