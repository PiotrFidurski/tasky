import { format } from 'date-fns';

import { redirect } from 'remix';

import { DATE_FORMAT } from '~/utils/date';

export async function loader() {
  return redirect(`/${format(new Date(), DATE_FORMAT)}`);
}

export default function IndexRoute() {
  return null;
}
