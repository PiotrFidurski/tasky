import { format } from 'date-fns';

import { LoaderArgs, redirect } from 'remix';

import { Outlet } from '@remix-run/react';

import { requireUserId } from '~/server/session/auth.server';

import { DesktopSidebar } from '~/components/Sidebar/desktop';
import { MobileSidebar } from '~/components/Sidebar/mobile';
import { MainLayout, RootLayout, SidebarLayout } from '~/components/layout';

import { DATE_FORMAT } from '~/utils/date';

export async function loader({ request, params }: LoaderArgs) {
  await requireUserId(request);

  if (!params.day) {
    const today = format(new Date(), DATE_FORMAT);
    return redirect(`/calendar/${today}`);
  }

  return null;
}

export default function CalendarRoute() {
  return (
    <RootLayout>
      <SidebarLayout>
        <DesktopSidebar />
        <MobileSidebar />
      </SidebarLayout>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </RootLayout>
  );
}
