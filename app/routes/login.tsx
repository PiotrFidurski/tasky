import { ActionFunction, Form } from 'remix';
import { authenticator } from '~/session/auth.server';

export const action: ActionFunction = async ({
  request,
}) => {
  try {
    const login = await authenticator.authenticate(
      'form',
      request,
      {
        successRedirect: '/home',
        failureRedirect: '/login',
      }
    );

    return login;
  } catch (e) {
    return e;
  }
};

export default function LoginRoute() {
  return (
    <div>
      <Form method="post">
        <label htmlFor="username">
          <input
            required
            id="username"
            aria-label="username"
            name="username"
          />
        </label>
        <label htmlFor="password">
          <input
            required
            id="password"
            type="password"
            minLength={8}
            name="password"
            aria-label="password"
          />
        </label>
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
