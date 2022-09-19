import { Suspense, lazy, useEffect, useRef } from 'react';

import { Outlet } from '@remix-run/react';

import {
  ContentLayout,
  MainLayout,
  RootLayout,
  SidebarLayout,
} from '~/components/layout';

import { useRouteData } from '~/utils/hooks/useRouteData';

const DesktopSidebar = lazy(() => import('../components/Sidebar/desktop'));
const MobileSidebar = lazy(() => import('../components/Sidebar/mobile'));

export default function HomeRoute() {
  const data = useRouteData<{ isMobile: boolean }>('root');
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return (
    <RootLayout>
      <SidebarLayout>
        {!data?.isMobile && mountedRef.current ? (
          <Suspense fallback="">
            <DesktopSidebar />
          </Suspense>
        ) : null}
        {data?.isMobile && mountedRef.current ? (
          <Suspense fallback="">
            <MobileSidebar />
          </Suspense>
        ) : null}
      </SidebarLayout>
      <MainLayout>
        <ContentLayout>
          <Outlet />
        </ContentLayout>
      </MainLayout>
    </RootLayout>
  );
}
