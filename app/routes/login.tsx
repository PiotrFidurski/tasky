import bcrypt from 'bcryptjs';
import { ZodError, z } from 'zod';
import { login } from '~/session/auth.server';
import { createUserSession } from '~/session/session.server';
import { ZodLoginErrors, loginSchema } from '~/validation/user';

import { ActionFunction, Form, Link, useActionData } from 'remix';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';
import { useErrors } from '~/utils/hooks/useErrors';

type ActionData = z.infer<typeof ZodLoginErrors>;

export const action: ActionFunction = async ({ request }) => {
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
          password: [`The password you provided doesn't match.`],
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
};

export default function LoginRoute() {
  const actionData = useActionData<ActionData | undefined>();

  const { fieldErrors } = useErrors(actionData);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-custom__gray dark:text-custom__ghostly font-bold text-4xl py-4">
        Login
      </h1>
      <Form method="post" className="flex flex-col gap-3 max-w-lg w-full px-4">
        <FieldWrapper
          errorMessage={fieldErrors?.username || ''}
          htmlFor="username"
        >
          <InputField
            required
            id="username"
            aria-label="username"
            placeholder="Username"
            name="username"
          />
        </FieldWrapper>
        <FieldWrapper
          htmlFor="password"
          errorMessage={fieldErrors?.password || ''}
        >
          <InputField
            minLength={8}
            required
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            aria-label="password"
          />
        </FieldWrapper>
        <div className="flex items-center justify-between w-full gap-4">
          <Button
            primary
            className="p-2 rounded-md justify-center uppercase font-bold"
          >
            <span>Login</span>
          </Button>
          <Link
            to="/register"
            className="flex justify-center items-center border-2 border-blue-600 w-full rounded py-2 font-bold uppercase text-blue-600 hover:text-white hover:bg-blue-600 focus:outline-dashed outline-offset-2 focus:outline-2 focus:outline-blue-900 transition-colors"
          >
            Register
          </Link>
        </div>
      </Form>
    </main>
  );
}
