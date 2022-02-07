import { ZodError, z } from 'zod';

import {
  ActionFunction,
  Form,
  Link,
  useActionData,
  useTransition,
} from 'remix';

import { getUserByUsername } from '~/models/user';

import { ZodRegisterErrors, registerSchema } from '~/validation/user';

import { register } from '~/session/auth.server';
import { createUserSession } from '~/session/session.server';

import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

type ActionData = z.infer<typeof ZodRegisterErrors>;

export const action: ActionFunction = async ({ request }) => {
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
};

export default function LoginRoute() {
  const actionData = useActionData<ActionData | undefined>();

  const transition = useTransition();

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-slate-600 font-bold text-4xl py-4">Register</h1>
      <Form method="post" className="flex flex-col gap-3 max-w-lg w-full px-4">
        <FieldWrapper
          htmlFor="username"
          errorMessage={
            transition.state === 'idle' && actionData?.errors
              ? actionData.errors.username
              : ''
          }
        >
          <InputField
            required
            id="username"
            aria-label="username"
            name="username"
            placeholder="Username"
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
            required
            minLength={8}
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            aria-label="password"
          />
        </FieldWrapper>
        <FieldWrapper
          htmlFor="password confirmation"
          errorMessage={
            transition.state === 'idle' && actionData?.errors
              ? actionData.errors.passwordConfirmation
              : ''
          }
        >
          <InputField
            required
            minLength={8}
            type="password"
            placeholder="Password confirmation"
            id="passwordConfirmation"
            aria-label="password confirmation"
            name="passwordConfirmation"
          />
        </FieldWrapper>
        <div className="flex justify-between items-center gap-4">
          <button
            type="submit"
            className="border-2 border-blue-600 w-full bg-blue-600 rounded py-2 text-white font-bold uppercase hover:bg-blue-700 hover:border-blue-700 focus:outline-dashed outline-offset-2 focus:outline-2 focus:outline-blue-900 transition-colors"
          >
            Register
          </button>
          <Link
            to="/login"
            className="w-full text-center py-2 border-2 rounded border-slate-600 focus:outline-dashed outline-offset-2 focus:outline-2 focus:outline-blue-900 transition-colors"
          >
            already have an account?
          </Link>
        </div>
      </Form>
    </main>
  );
}
