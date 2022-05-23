import { destroyUserSession } from '~/session/session.server';

import { ActionFunction, LoaderFunction, redirect } from 'remix';

import { formatDate } from '~/utils/date';

export const action: ActionFunction = async ({ request }) => {
  try {
    return await destroyUserSession(request);
  } catch (error) {
    return error;
  }
};

export const loader: LoaderFunction = () => {
  return redirect(`/${formatDate()}`);
};
