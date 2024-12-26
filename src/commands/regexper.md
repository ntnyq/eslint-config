# `regexper`

Generate up-to-date [regexper](https://regexper.com/) links for your RegExp patterns in jsdoc comments. Helps you inspect the RegExp in graphic.

## Triggers

- `// @regexper`
- `/* @regexper */`

## Examples

```js
/**
 * RegExp to match foo or bar, optionally wrapped in quotes.
 *
 * @regexper
 */
const foo = /(['"])?(foo|bar)\\1?/gi
```

Will be updated to:

```js
/**
 * RegExp to match foo or bar, optionally wrapped in quotes.
 *
 * @regexper https://regexper.com/#%2F%28%5B'%22%5D%29%3F%28foo%7Cbar%29%5C%5C1%3F%2Fgi
 */
const foo = /(['"])?(foo|bar)\\1?/gi
```

An whenever you update the RegExp pattern, the link will be updated as well.
