import { Outlet } from 'remix';

import { Sidebar } from '~/components/Menus/Sidebar';
import { ContentLayout, MainLayout, SidebarLayout } from '~/components/layout';

export default function HomeRoute() {
  return (
    <MainLayout>
      <SidebarLayout>
        <Sidebar />
      </SidebarLayout>
      <ContentLayout>
        <Outlet />
      </ContentLayout>
    </MainLayout>
  );
}
