import bcrypt from 'bcryptjs';
import { ActionFunction, Form, useActionData } from 'remix';
import { ZodError } from 'zod';
import { login } from '~/session/auth.server';
import { createUserSession } from '~/session/session.server';
import { LoginActionData, loginSchema } from '~/session/validation.server';
import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

export const action: ActionFunction = async ({ request }) => {
  try {
    const form = await request.formData();

    const username = form.get('username') as string;
    const password = form.get('password') as string;

    loginSchema.parse({ username, password });

    const user = await login({ username, password });

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
          password: [`The password you provided doesn't match.`],
        },
      });
    }

    return await createUserSession({ user });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten();

      return badRequest({
        errors: { ...errors.fieldErrors },
      });
    }

    return badRequest({ message: getErrorMessage(error) });
  }
};

export default function LoginRoute() {
  const actionData = useActionData<LoginActionData | undefined>();

  return (
    <div>
      <Form method="post">
        <input type="hidden" value="login" name="type" />
        <label htmlFor="username">
          <input
            required
            aria-describedby="username-error-message"
            id="username"
            aria-label="username"
            name="username"
          />
          <span id="username-error-message">
            {actionData?.errors ? actionData?.errors?.username : ''}
          </span>
        </label>
        <label htmlFor="password">
          <input
            required
            minLength={8}
            id="password"
            type="password"
            aria-describedby="password-error-message"
            name="password"
            aria-label="password"
          />
          <span id="password-error-message">
            {actionData?.errors ? actionData?.errors?.password : ''}
          </span>
        </label>
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
