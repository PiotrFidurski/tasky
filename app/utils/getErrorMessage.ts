/**
 * Returns string representation of error.
 *
 * @param error - Can be anything.
 * @returns `String`
 */
export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
