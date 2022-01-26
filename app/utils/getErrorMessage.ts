/**
 * Returns string representation of error
 *
 * @param {unknown} error - can be anything.
 * @returns `String`
 */
export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
