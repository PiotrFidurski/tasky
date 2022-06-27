import { format } from 'date-fns';

import { LoaderFunction, redirect } from 'remix';

import { DATE_FORMAT } from '~/utils/date';

export const loader: LoaderFunction = async () => {
  return redirect(`/${format(new Date(), DATE_FORMAT)}`);
};

export default function IndexRoute() {
  return null;
}
