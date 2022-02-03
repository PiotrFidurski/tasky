import bcrypt from 'bcryptjs';
import {
  ActionFunction,
  Form,
  Link,
  useActionData,
  useTransition,
} from 'remix';
import { ZodError } from 'zod';
import { getUser } from '~/session/auth.server';
import { createUserSession } from '~/session/session.server';
import { LoginActionData, loginSchema } from '~/session/validation.server';
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
    <main className="flex justify-center items-center h-screen">
      <Form method="post" className="flex flex-col gap-3 max-w-lg w-full px-4">
        <label htmlFor="username">
          <span className="text-slate-900 font-semibold">Username</span>
          <input
            className="border-b-2 mt-2 border-slate-600 px-2 py-2 w-full focus:outline-none focus:border-b-blue-600 focus:bg-blue-200 transition-colors"
            required
            id="username"
            aria-label="username"
            placeholder="Username"
            name="username"
          />
          <div className="min-h-[1rem] flex items-center mt-1">
            <span
              aria-live="polite"
              aria-atomic="true"
              className="text-rose-500 font-semibold text-xs"
            >
              {transition.state === 'idle' && actionData?.errors
                ? actionData.errors.username
                : ''}
            </span>
          </div>
        </label>
        <label htmlFor="password">
          <span className="text-slate-900 font-semibold">Password</span>
          <input
            minLength={8}
            className="border-b-2 mt-2 border-slate-600 px-2 py-2 w-full focus:outline-none focus:border-b-blue-600 focus:bg-blue-200 transition-colors"
            required
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            aria-label="password"
          />
          <div className="min-h-[1rem] flex items-center mt-1">
            <span
              aria-live="polite"
              aria-atomic="true"
              className="text-rose-500 font-semibold text-xs"
            >
              {transition.state === 'idle' && actionData?.errors
                ? actionData.errors.password
                : ''}
            </span>
          </div>
        </label>
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
