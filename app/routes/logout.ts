import { destroyUserSession } from '~/session/session.server';

import { ActionFunction, LoaderFunction, redirect } from 'remix';

export const action: ActionFunction = async ({ request }) => {
  try {
    return await destroyUserSession(request);
  } catch (error) {
    return error;
  }
};

export const loader: LoaderFunction = () => {
  return redirect('/home');
};
