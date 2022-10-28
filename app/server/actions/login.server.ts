import bcrypt from 'bcryptjs';

import { ZodError } from 'zod';

import { ActionArgs } from 'remix';

import { loginSchema } from '~/validation/user';

import { login } from '~/server/session/auth.server';
import { createUserSession } from '~/server/session/session.server';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

export async function action({ request }: ActionArgs) {
  try {
    const form = await request.formData();

    const { username, password } = loginSchema.parse(form);

    const user = await login(username);

    if (!user) {
      return badRequest({
        errors: {
          username: [`No user with that username exists.`],
        },
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return badRequest({
        errors: {
          password: ['Wrong password.'],
        },
      });
    }

    return await createUserSession(user.id);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten();

      return badRequest({
        errors: { ...errors.fieldErrors },
      });
    }

    return badRequest({ message: getErrorMessage(error) });
  }
}

export type LoginAction = typeof action;
