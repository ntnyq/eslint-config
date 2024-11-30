import type { PrettierOptions } from './types'

/**
 * Options from `@ntnyq/prettier-config`
 */
export const DEFAULT_PRETTIER_OPTIONS: PrettierOptions = {
  // Specify the number of spaces per indentation-level
  tabWidth: 2,

  // Use semicolons or not
  semi: false,

  // Format only a segment of a file.
  rangeStart: 0,

  // Indent lines with tabs instead of spaces
  useTabs: false,

  // Maximum line length
  printWidth: 100,

  // End of line
  endOfLine: 'lf',

  // Use single quotes instead of double quotes
  singleQuote: true,

  // Prettier can insert a special @format marker at the top of files specifying that the file has been formatted with prettier.
  insertPragma: false,

  // Use single quotes instead of double quotes in JSX
  jsxSingleQuote: true,

  // Print trailing commas wherever possible when multi-line
  trailingComma: 'all',

  // Print spaces between brackets in object literals.
  bracketSpacing: true,

  // Include parentheses around a sole arrow function parameter
  arrowParens: 'avoid',

  // Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file.
  requirePragma: false,

  // Specify which parser to use.
  // parser: undefined,

  // Specify the file name to use to infer which parser to use.
  // filepath: undefined,

  // By default, Prettier will wrap markdown text as-is since some services use a line-break-sensitive renderer, e.g. GitHub comment and Bitbucket.
  proseWrap: 'preserve',

  // Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being alone on the next line (does not apply to self closing elements)
  bracketSameLine: false,

  // Change when properties in objects are quoted
  quoteProps: 'as-needed',

  // Enforce single attribute per line in HTML, Vue and JSX
  singleAttributePerLine: true,

  // Whether or not to indent the code inside <script> and <style> tags in Vue files
  vueIndentScriptAndStyle: false,

  // Specify the global whitespace sensitivity for HTML files
  htmlWhitespaceSensitivity: 'css',

  rangeEnd: Number.POSITIVE_INFINITY,

  // Control whether Prettier formats quoted code embedded in the file
  embeddedLanguageFormatting: 'auto',
}
