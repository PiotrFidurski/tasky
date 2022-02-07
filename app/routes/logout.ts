import { ActionFunction, LoaderFunction, redirect } from 'remix';

import { destroyUserSession } from '~/session/session.server';

export const action: ActionFunction = async ({ request }) => {
  const logout = await destroyUserSession(request);

  return logout;
};

export const loader: LoaderFunction = () => {
  return redirect('/home');
};
