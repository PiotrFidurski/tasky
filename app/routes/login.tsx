import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';

import {
  ActionFunction,
  Form,
  Link,
  useActionData,
  useTransition,
} from 'remix';

import { login } from '~/session/auth.server';
import { createUserSession } from '~/session/session.server';
import { LoginActionData, loginSchema } from '~/session/validation.server';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

export const action: ActionFunction = async ({ request }) => {
  try {
    const form = await request.formData();

    const { username, password } = loginSchema.parse(form);

    const user = await getUser(username);

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
  const actionData = useActionData<LoginActionData | undefined>();

  const transition = useTransition();

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-slate-600 font-bold text-4xl py-4">Login</h1>
      <Form method="post" className="flex flex-col gap-3 max-w-lg w-full px-4">
        <FieldWrapper
          errorMessage={
            transition.state === 'idle' && actionData?.errors
              ? actionData.errors.username
              : ''
          }
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
          errorMessage={
            transition.state === 'idle' && actionData?.errors
              ? actionData.errors.password
              : ''
          }
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
          <button
            type="submit"
            className="border-2 border-blue-600 w-full bg-blue-600 rounded py-2 text-white font-bold uppercase hover:bg-blue-700 hover:border-blue-700 focus:outline-dashed outline-offset-2 focus:outline-2 focus:outline-blue-900 transition-colors"
          >
            Login
          </button>
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
