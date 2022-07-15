import { format } from 'date-fns';

import { ActionFunction, LoaderFunction, redirect } from 'remix';

import { destroyUserSession } from '~/session/session.server';

import { DATE_FORMAT } from '~/utils/date';

export const action: ActionFunction = async ({ request }) => {
  try {
    return await destroyUserSession(request);
  } catch (error) {
    return error;
  }
};

export const loader: LoaderFunction = () => {
  return redirect(`/${format(new Date(), DATE_FORMAT)}`);
};
