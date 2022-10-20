import { Form, useActionData } from '@remix-run/react';

import { action } from '~/server/actions/login.server';

import { Button } from '~/components/Elements/Button';
import { CustomLink } from '~/components/Elements/CustomLink';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';
import { Spinner } from '~/components/Spinner';

import { useActionTransition } from '~/utils/hooks/useActionTransition';
import { useErrors } from '~/utils/hooks/useErrors';

export { action };

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
