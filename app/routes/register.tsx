import { Form, useActionData } from '@remix-run/react';

import { action } from '~/server/actions/register.server';

import { Button } from '~/components/Elements/Button';
import { CustomLink } from '~/components/Elements/CustomLink';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

import { useErrors } from '~/utils/hooks/useErrors';

export { action };

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
          <Button primary type="submit" className="w-full">
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
