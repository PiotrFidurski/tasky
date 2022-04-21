import { Outlet } from 'remix';

import { DesktopSidebar } from '~/components/Sidebar/index.desktop';
import { MobileSidebar } from '~/components/Sidebar/index.mobile';
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
          home page
        </ContentLayout>
      </MainLayout>
    </RootLayout>
  );
}
