import { groupTasksByScheduledFor } from '~/models/task';
import { getAuthUserId } from '~/session/session.server';

import { LoaderFunction, useLoaderData } from 'remix';

import { CompletedTasks } from '~/components/Widgets/CompletedTasks/';

import { getDayStats } from '~/utils/getStats';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getAuthUserId(request);

  const groupedTasks = await groupTasksByScheduledFor(userId);

  const stats = getDayStats(groupedTasks);

  return stats;
};

export default function HomeIndexRoute() {
  const data = useLoaderData<{ [key: string]: number[] }>();

  console.log({ data });
  return (
    <div>
      <CompletedTasks />
    </div>
  );
}
