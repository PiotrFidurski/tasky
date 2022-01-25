import { ActionFunction, Form, useActionData } from 'remix';
import { authenticator } from '~/session/auth.server';

export const action: ActionFunction = async ({ request }) => {
  const loginData = await authenticator.authenticate('form', request);

  return loginData;
};

type ActionData = {
  fieldErrors: {
    username?: string;
    password?: string;
    passwordConfirmation?: string;
  };
};

export default function LoginRoute() {
  const actionData = useActionData<ActionData | undefined>();

  return (
    <div>
      <Form method="post">
        <input type="hidden" value="login" name="type" />
        <label htmlFor="username">
          <input
            required
            aria-describedby="username-error-message"
            id="username"
            aria-label="username"
            name="username"
          />
          <span id="username-error-message">
            {actionData?.fieldErrors ? actionData?.fieldErrors?.username : ''}
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
            {actionData?.fieldErrors ? actionData?.fieldErrors?.password : ''}
          </span>
        </label>
        {/* <label htmlFor="passwordConfirmation">
          <input
            placeholder="passwordC"
            required
            aria-describedby="passwordConfirmation-error-message"
            id="passwordConfirmation"
            aria-label="password confirmation"
            name="passwordConfirmation"
          />
          <span id="passwordConfirmation-error-message">
            {actionData?.fieldErrors
              ? actionData?.fieldErrors?.passwordConfirmation
              : ''}
          </span>
        </label> */}
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
