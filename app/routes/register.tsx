import { ActionFunction, Form, useActionData } from 'remix';
import { ZodError } from 'zod';
import { db } from '~/db/db.server';
import { register, registerSchema } from '~/session/auth.server';
import { createUserSession } from '~/session/session.server';
import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

export const action: ActionFunction = async ({ request }) => {
  try {
    const form = await request.formData();

    const username = form.get('username') as string;
    const password = form.get('password') as string;
    const passwordConfirmation = form.get('passwordConfirmation') as string;

    registerSchema.parse({ username, password, passwordConfirmation });

    const existingUser = await db.user.findFirst({
      where: { username },
    });

    if (existingUser) {
      return badRequest({
        errors: {
          username: `This username is already taken.`,
        },
      });
    }

    const user = await register({ username, password });

    return await createUserSession({ user });
  } catch (error) {
    if (error instanceof ZodError) {
      const parsedErrors = error.flatten();
      return badRequest({
        errors: {
          ...parsedErrors.fieldErrors,
        },
      });
    }

    return badRequest({ message: getErrorMessage(error) });
  }
};

type ActionData = {
  fieldErrors: {
    username?: string;
    password?: string;
    passwordConfirmation?: string;
  };
};

export default function LoginRoute() {
  const actionData = useActionData<ActionData | undefined>();

  return (
    <div>
      <Form method="post">
        <label htmlFor="username">
          <input
            required
            aria-describedby="username-error-message"
            id="username"
            aria-label="username"
            name="username"
          />
          <span id="username-error-message">
            {actionData?.fieldErrors ? actionData?.fieldErrors?.username : ''}
          </span>
        </label>
        <label htmlFor="password">
          <input
            required
            id="password"
            type="password"
            aria-describedby="password-error-message"
            minLength={8}
            name="password"
            aria-label="password"
          />
          <span id="password-error-message">
            {actionData?.fieldErrors ? actionData?.fieldErrors?.password : ''}
          </span>
        </label>
        <label htmlFor="passwordConfirmation">
          <input
            placeholder="passwordC"
            required
            aria-describedby="passwordConfirmation-error-message"
            id="passwordConfirmation"
            aria-label="password confirmation"
            name="passwordConfirmation"
          />
          <span id="passwordConfirmation-error-message">
            {actionData?.fieldErrors
              ? actionData?.fieldErrors?.passwordConfirmation
              : ''}
          </span>
        </label>
        <button type="submit">Register</button>
      </Form>
    </div>
  );
}
