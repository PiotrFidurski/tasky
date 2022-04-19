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
        <MainLayout>
          <ContentLayout>
            <div className="mt-20">
              <Outlet />
              home page
            </div>
          </ContentLayout>
        </MainLayout>
      </SidebarLayout>
    </RootLayout>
  );
}
