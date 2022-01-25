import { ActionFunction, Form, useActionData } from 'remix';
import { authenticator } from '~/session/auth.server';

export const action: ActionFunction = async ({
  request,
}) => {
  const loginData = await authenticator.authenticate(
    'form',
    request
  );

  return loginData;
};

export default function LoginRoute() {
  const actionData = useActionData();

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
            {actionData?.fieldErrors
              ? actionData?.fieldErrors?.username
              : ''}
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
            {actionData?.fieldErrors
              ? actionData?.fieldErrors?.password
              : ''}
          </span>
        </label>
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
