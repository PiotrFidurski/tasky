import { requireUserId } from '~/session/auth.server';

import { LoaderFunction, Outlet, redirect } from 'remix';

import { MobileNav } from '~/components/Menus/MobileNav';
import { DesktopSidebar } from '~/components/Sidebar/desktop';
import { MobileSidebar } from '~/components/Sidebar/mobile';
import {
  MainLayout,
  MobileNavLayout,
  RootLayout,
  SidebarLayout,
} from '~/components/layout';

import { formatDate } from '~/utils/date';

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUserId(request);

  if (!params.day) {
    const today = formatDate();
    return redirect(`/calendar/${today}`);
  }

  return null;
};

export default function CalendarRoute() {
  return (
    <RootLayout>
      <SidebarLayout>
        <DesktopSidebar />
        <MobileSidebar />
      </SidebarLayout>
      <MainLayout>
        <MobileNavLayout>
          <MobileNav />
        </MobileNavLayout>
        <Outlet />
      </MainLayout>
    </RootLayout>
  );
}
