import { groupTasksByScheduledFor } from '~/models/task';
import { requireUserId } from '~/session/auth.server';

import { LoaderFunction, Outlet, useLoaderData, useParams } from 'remix';

import { Calendar } from '~/components/Widgets/Calendar';

import { getDayStats } from '~/utils/getDayStats';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const groupedTasks = await groupTasksByScheduledFor(userId);

  const stats = getDayStats(groupedTasks);

  return stats;
};

export default function IndexRoute() {
  const stats = useLoaderData<{ [key: string]: number[] }>();
  const params = useParams<'day'>();

  return (
    <div>
      <Calendar date={new Date()} stats={stats} />
      tasks for day: {params.day}
    </div>
  );
}
