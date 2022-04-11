import { Outlet } from 'remix';

import { WIPv2Sidebar } from '~/components/Menus/WIPv2_Sidebar';
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
        <MainLayout>
          <ContentLayout>
            <WIPv2Sidebar />
            <div className="mt-20">
              <Outlet />
              asdasdasdsa
            </div>
          </ContentLayout>
        </MainLayout>
      </SidebarLayout>
    </RootLayout>
  );
}
