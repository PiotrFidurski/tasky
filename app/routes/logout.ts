import { format } from 'date-fns';

import { ActionArgs, LoaderFunction, redirect } from 'remix';

import { destroyUserSession } from '~/server/session/session.server';

import { DATE_FORMAT } from '~/utils/date';

export async function action({ request }: ActionArgs) {
  try {
    return await destroyUserSession(request);
  } catch (error) {
    return error;
  }
}

export const loader: LoaderFunction = () => {
  return redirect(`/${format(new Date(), DATE_FORMAT)}`);
};
