import { Outlet } from 'remix';

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
          home page
        </ContentLayout>
      </MainLayout>
    </RootLayout>
  );
}
