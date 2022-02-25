import { Outlet, useCatch } from 'remix';

import { Sidebar } from '~/components/Sidebar';
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

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
