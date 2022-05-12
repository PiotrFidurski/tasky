import { LoaderFunction, redirect } from 'remix';

import { formatDate } from '~/utils/date';

export const loader: LoaderFunction = async () => {
  return redirect(`/${formatDate()}`);
};

export default function IndexRoute() {
  return null;
}
