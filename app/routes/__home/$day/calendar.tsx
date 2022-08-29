import nProgressStyles from 'nprogress/nprogress.css';

import { LinksFunction } from 'remix';

import { CalendarModal } from '~/components/Modals/Calendar';

import { useRouteTransition } from '~/utils/hooks/useRouteTransition';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: nProgressStyles }];
};

export default function CalendarRoute() {
  useRouteTransition();
  return <CalendarModal />;
}
