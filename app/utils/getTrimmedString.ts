/**
 * @remarks Regex pattern removes more than one whitespace between two or more strings
 */
const REGEX = / +(?= )/g;

export function getTrimmedString(value: string) {
  return value.replace(REGEX, '').trim();
}
