import { groupTasksByScheduledFor } from '~/models/task';
import { requireUserId } from '~/session/auth.server';

import { LoaderFunction, useLoaderData } from 'remix';

import { CompletedTasks } from '~/components/Widgets/CompletedTasks/';

import { getTotalTasksCount } from '~/utils/getStats';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const groupedTasks = await groupTasksByScheduledFor(userId);

  const { completed, total } = getTotalTasksCount(groupedTasks);

  const percentage = Number(((completed / total) * 100).toFixed());

  return { completed, total, percentage };
};

type LoaderData = {
  total: number;
  completed: number;
  percentage: number;
};

export default function HomeIndexRoute() {
  const { total, completed, percentage } = useLoaderData<LoaderData>();

  return (
    <div>
      <CompletedTasks
        total={total}
        completed={completed}
        percentage={percentage}
      />
    </div>
  );
}
