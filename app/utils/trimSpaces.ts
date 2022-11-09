/**
 * @remarks Regex pattern removes more than one whitespace between two or more strings
 */
const REGEX = / +(?= )/g;

/**
 * removes trailing and leading spaces, but preserves at least
 * one space in between words.
 */
export function trimSpaces(value: string) {
  return value.replace(REGEX, '').trim();
}
