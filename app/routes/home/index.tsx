import { groupTasksByScheduledFor } from '~/models/task';
import { getAuthUserId } from '~/session/session.server';

import { LoaderFunction, useLoaderData } from 'remix';

import { CompletedTasks } from '~/components/Widgets/CompletedTasks/';

import { getTotalTasksCount } from '~/utils/getStats';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getAuthUserId(request);

  const groupedTasks = await groupTasksByScheduledFor(userId);

  const stats = getTotalTasksCount(groupedTasks);

  return stats;
};

type LoaderData = {
  total: number;
  completed: number;
};

export default function HomeIndexRoute() {
  const { total, completed } = useLoaderData<LoaderData>();

  return (
    <div>
      <CompletedTasks total={total} completed={completed} />
    </div>
  );
}
