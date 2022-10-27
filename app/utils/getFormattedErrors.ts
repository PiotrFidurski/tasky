import { ZodError } from 'zod';

import { badRequest } from './badRequest';
import { getErrorMessage } from './getErrorMessage';

export function getFormattedErrors(error: unknown) {
  if (error instanceof ZodError) {
    const errors = error.flatten();

    return badRequest({
      errors: { ...errors.fieldErrors },
    });
  }

  throw badRequest({ message: getErrorMessage(error) });
}
