import { Outlet } from 'remix';

import { DesktopSidebar } from '~/components/Sidebar/desktop';
import { MobileSidebar } from '~/components/Sidebar/mobile';
import { Calendar } from '~/components/Widgets/Calendar';
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
          <Calendar date={new Date()} />
        </ContentLayout>
      </MainLayout>
    </RootLayout>
  );
}
