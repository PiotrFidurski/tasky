import { Outlet } from '@remix-run/react';

import { DesktopSidebar } from '~/components/Sidebar/desktop';
import { MobileSidebar } from '~/components/Sidebar/mobile';
import {
  ContentLayout,
  MainLayout,
  RootLayout,
  SidebarLayout,
} from '~/components/layout';

export default function HomeRoute() {
  return (
    <RootLayout>
      <SidebarLayout>
        <DesktopSidebar />
        <MobileSidebar />
      </SidebarLayout>
      <MainLayout>
        <ContentLayout>
          <Outlet />
        </ContentLayout>
      </MainLayout>
    </RootLayout>
  );
}
