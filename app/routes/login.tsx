import bcrypt from 'bcryptjs';

import { ZodError } from 'zod';

import { ActionArgs } from 'remix';

import { Form, useActionData } from '@remix-run/react';

import { loginSchema } from '~/validation/user';

import { login } from '~/server/session/auth.server';
import { createUserSession } from '~/server/session/session.server';

import { Button } from '~/components/Elements/Button';
import { CustomLink } from '~/components/Elements/CustomLink';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';
import { Spinner } from '~/components/Spinner';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';
import { useActionTransition } from '~/utils/hooks/useActionTransition';
import { useErrors } from '~/utils/hooks/useErrors';

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

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();

  const { isSubmitting } = useActionTransition();

  const { fieldErrors } = useErrors(actionData);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold text-4xl py-4">Login</h1>
      <Form method="post" className="flex flex-col gap-3 max-w-lg w-full px-4">
        <FieldWrapper
          labelName="Username"
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
          labelName="Password"
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
          <Button primary type="submit" className="w-full justify-center flex">
            {isSubmitting ? <Spinner /> : 'Login'}
          </Button>
          <CustomLink to="/register" className="w-full flex justify-center">
            <span>Register</span>
          </CustomLink>
        </div>
      </Form>
    </main>
  );
}
