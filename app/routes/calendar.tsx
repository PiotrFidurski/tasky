import { LoaderFunction, Outlet, redirect } from 'remix';

import { Sidebar } from '~/components/Sidebar';
import { MainLayout, SidebarLayout } from '~/components/layouts';

import { formatDate } from '~/utils/date';

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.day) {
    const today = formatDate();
    return redirect(`/calendar/${today}`);
  }

  return null;
};

export default function CalendarRoute() {
  return (
    <MainLayout>
      <SidebarLayout>
        <Sidebar
          // hardcode for now, implement authcontext later
          user={{
            id: '1',
            username: 'chimson',
            updatedAt: new Date(),
            createdAt: new Date(),
            password: 'ss',
          }}
        />
      </SidebarLayout>
      <Outlet />
    </MainLayout>
  );
}
