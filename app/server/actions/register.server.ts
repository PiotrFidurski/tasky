import { ZodError } from 'zod';

import { ActionArgs } from 'remix';

import { registerSchema } from '~/validation/user';

import { getUserByUsername } from '~/server/models/user';
import { register } from '~/server/session/auth.server';
import { createUserSession } from '~/server/session/session.server';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

export async function action({ request }: ActionArgs) {
  try {
    const form = await request.formData();

    const { username, password } = registerSchema.parse(form);

    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return badRequest({
        errors: {
          username: ['This username is already taken.'],
        },
      });
    }

    const user = await register({ username, password });

    return await createUserSession(user.id);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten();

      return badRequest({
        errors: {
          ...errors.fieldErrors,
        },
      });
    }

    return badRequest({ message: getErrorMessage(error) });
  }
}

export type RegisterAction = typeof action;
