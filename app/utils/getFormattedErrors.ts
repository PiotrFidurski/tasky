import { ZodError } from 'zod';

import { badRequest } from './badRequest';
import { getErrorMessage } from './getErrorMessage';

/**
 * Returns string representation of error.
 *
 * @param error - Can be anything.
 * @returns `Object` containing errors fields with messages
 * `|| String` with an error message
 */
export function getFormattedErrors(error: unknown) {
  if (error instanceof ZodError) {
    const errors = error.flatten();

    return badRequest({
      errors: errors.fieldErrors,
    });
  }

  throw badRequest({ message: getErrorMessage(error) });
}
