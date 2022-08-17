import { ZodError } from 'zod';

import { ActionArgs } from 'remix';

import { Form, useActionData } from '@remix-run/react';

import { registerSchema } from '~/validation/user';

import { getUserByUsername } from '~/server/models/user';
import { register } from '~/server/session/auth.server';
import { createUserSession } from '~/server/session/session.server';

import { Button } from '~/components/Elements/Button';
import { CustomLink } from '~/components/Elements/CustomLinkv2';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';
import { useErrors } from '~/utils/hooks/useErrors';

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

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();

  const { fieldErrors } = useErrors(actionData);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold text-4xl py-4">Register</h1>
      <Form method="post" className="flex flex-col gap-3 max-w-lg w-full px-4">
        <FieldWrapper
          labelName="Username"
          htmlFor="username"
          errorMessage={fieldErrors?.username || ''}
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
          labelName="Password"
          htmlFor="password"
          errorMessage={fieldErrors?.password || ''}
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
          labelName="Password confirmation"
          htmlFor="password confirmation"
          errorMessage={fieldErrors?.passwordConfirmation || ''}
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
        <div className="flex items-center justify-between w-full gap-4">
          <Button primary className="w-full">
            <span>Register</span>
          </Button>
          <CustomLink to="/login" className="w-full flex justify-center">
            <span>Login</span>
          </CustomLink>
        </div>
      </Form>
    </main>
  );
}
