import type { PrettierOptions } from './types'

/**
 * Options from `@ntnyq/prettier-config`
 */
export const DEFAULT_PRETTIER_OPTIONS: PrettierOptions = {
  // Include parentheses around a sole arrow function parameter
  arrowParens: 'avoid',

  // Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being alone on the next line (does not apply to self closing elements)
  bracketSameLine: false,

  // Print spaces between brackets in object literals.
  bracketSpacing: true,

  // Control whether Prettier formats quoted code embedded in the file
  embeddedLanguageFormatting: 'auto',

  // End of line
  endOfLine: 'lf',

  // Specify the global whitespace sensitivity for HTML files
  htmlWhitespaceSensitivity: 'css',

  // Prettier can insert a special @format marker at the top of files specifying that the file has been formatted with prettier.
  insertPragma: false,

  // Use single quotes instead of double quotes in JSX
  jsxSingleQuote: true,

  // Maximum line length
  printWidth: 100,

  // By default, Prettier will wrap markdown text as-is since some services use a line-break-sensitive renderer, e.g. GitHub comment and Bitbucket.
  proseWrap: 'preserve',

  // Change when properties in objects are quoted
  quoteProps: 'as-needed',

  rangeEnd: Number.POSITIVE_INFINITY,

  // Format only a segment of a file.
  rangeStart: 0,

  // Specify which parser to use.
  // parser: undefined,

  // Specify the file name to use to infer which parser to use.
  // filepath: undefined,

  // Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file.
  requirePragma: false,

  // Use semicolons or not
  semi: false,

  // Enforce single attribute per line in HTML, Vue and JSX
  singleAttributePerLine: true,

  // Use single quotes instead of double quotes
  singleQuote: true,

  // Specify the number of spaces per indentation-level
  tabWidth: 2,

  // Print trailing commas wherever possible when multi-line
  trailingComma: 'all',

  // Indent lines with tabs instead of spaces
  useTabs: false,

  // Whether or not to indent the code inside <script> and <style> tags in Vue files
  vueIndentScriptAndStyle: false,
}
