import { ZodError, z } from 'zod';
import { getUserByUsername } from '~/models/user';
import { ZodRegisterErrors, registerSchema } from '~/validation/user';

import { ActionFunction, Form, useActionData } from 'remix';

import { register } from '~/session/auth.server';
import { createUserSession } from '~/session/session.server';

import { Button } from '~/components/Elements/Button';
import { CustomLink } from '~/components/Elements/CustomLink';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';
import { useErrors } from '~/utils/hooks/useErrors';

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
          <Button
            className="rounded-full font-bold px-4 py-2 justify-center text-white bg-highlight focus:bg-highlightActive"
            primary
          >
            <span>Register</span>
          </Button>
          <CustomLink
            to="/login"
            className="font-bold w-full py-2 ring-2 dark:ring-white ring-black"
          >
            <span>Login</span>
          </CustomLink>
        </div>
      </Form>
    </main>
  );
}
