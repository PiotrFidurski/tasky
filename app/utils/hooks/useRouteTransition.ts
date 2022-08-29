import nProgress from 'nprogress';

import { useEffect } from 'react';

import { useTransition } from 'remix';

nProgress.configure({ showSpinner: false });

export function useRouteTransition() {
  const transition = useTransition();
  useEffect(() => {
    if (transition.state === 'idle') nProgress.done();
    else nProgress.start();
  }, [transition.state]);

  return transition;
}
