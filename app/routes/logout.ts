import { destroyUserSession } from '~/session/session.server';

import { ActionFunction, LoaderFunction, redirect } from 'remix';

export const action: ActionFunction = async ({ request }) => {
  const logout = await destroyUserSession(request);

  return logout;
};

export const loader: LoaderFunction = () => {
  return redirect('/home');
};
