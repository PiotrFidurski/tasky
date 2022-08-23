import { format } from 'date-fns';

import { LoaderArgs, json } from 'remix';

import { Outlet, useCatch, useLoaderData, useNavigate } from '@remix-run/react';

import { groupTasksByScheduledFor } from '~/server/models/task';
import { requireUserId } from '~/server/session/auth.server';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';
import { Calendar } from '~/components/Widgets/Calendar';
import { DayLink } from '~/components/Widgets/Calendar/components/DayLink';
import { CompletedTasks } from '~/components/Widgets/CompletedTasks';

import { DATE_FORMAT } from '~/utils/date';
import { getTaskStatsForEachDay, getTotalTasksCount } from '~/utils/taskStats';

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);

  const groupedTasks = await groupTasksByScheduledFor(userId);

  const { completed, total } = getTotalTasksCount(groupedTasks);

  const percentage = ((completed / total) * 100).toFixed();

  const stats = getTaskStatsForEachDay(groupedTasks);

  const data = {
    stats,
    completed,
    total,
    percentage: !Number.isNaN(Number(percentage)) ? Number(percentage) : 0,
  };

  return json(data, { status: 200 });
}

export default function DayRoute() {
  const { completed, percentage, total, stats } =
    useLoaderData<typeof loader>();

  return (
    <>
      <Calendar startingDate={new Date()} stats={stats}>
        {({ day, date }) => (
          <DayLink stats={stats} day={day} key={day} date={date} />
        )}
      </Calendar>
      <CompletedTasks
        total={total}
        completed={completed}
        percentage={percentage}
      />
      <Outlet />
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  const navigate = useNavigate();

  return (
    <div className="mt-12 p-4 bg-red-400 rounded-md">
      <div className="flex items-center mb-4">
        <Button
          className="w-auto"
          onClick={() => navigate(`/${format(new Date(), DATE_FORMAT)}`)}
        >
          <ArrowleftIcon />
        </Button>
        <div className="w-full grid place-content-center text-center">
          <p>{caught.status}</p>
          <p>{caught.statusText}</p>
        </div>
      </div>
      <details>
        <code className="break-words whitespace-normal">{caught.data}</code>
      </details>
    </div>
  );
}
