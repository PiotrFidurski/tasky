import { groupTasksByScheduledFor } from '~/models/task';
import { getAuthUserId } from '~/session/session.server';

import { LoaderFunction, useLoaderData } from 'remix';

import { Calendar } from '~/components/Widgets/Calendar';

import { getDayStats } from '~/utils/getDayStats';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getAuthUserId(request);

  const groupedTasks = await groupTasksByScheduledFor(userId);

  const stats = getDayStats(groupedTasks);

  return stats;
};

export default function IndexRoute() {
  const stats = useLoaderData<{ [key: string]: number[] }>();

  return (
    <div>
      <Calendar date={new Date()} stats={stats} />
    </div>
  );
}
