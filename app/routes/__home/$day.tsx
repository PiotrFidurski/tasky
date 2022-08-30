import nProgressStyles from 'nprogress/nprogress.css';

import { z } from 'zod';

import { format, isValid } from 'date-fns';

import { LinksFunction, LoaderArgs, json } from 'remix';

import {
  Outlet,
  useCatch,
  useLoaderData,
  useNavigate,
  useParams,
} from '@remix-run/react';

import { getTasksForDay, groupTasksByScheduledFor } from '~/server/models/task';
import { requireUserId } from '~/server/session/auth.server';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';
import { Calendar } from '~/components/Widgets/Calendar';
import { DayLink } from '~/components/Widgets/Calendar/components/DayLink';
import { CompletedTasks } from '~/components/Widgets/CompletedTasks';

import { badRequest } from '~/utils/badRequest';
import { DATE_FORMAT } from '~/utils/date';
import { useRouteTransition } from '~/utils/hooks/useRouteTransition';
import { getTaskStatsForEachDay, getTotalTasksCount } from '~/utils/taskStats';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: nProgressStyles }];
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);

  const day = z

    .string({ invalid_type_error: 'expected a string.' })
    .parse(params.day);

  if (!isValid(new Date(day))) {
    throw badRequest(
      'No tasks found for this date, please check if the date is a valid date format (yyyy-MM-dd) eg: "2022-02-22".',
      404
    );
  }

  const tasks = await getTasksForDay(day, userId);

  const groupedTasks = await groupTasksByScheduledFor(userId);

  const { completed, total } = getTotalTasksCount(groupedTasks);

  const percentage = ((completed / total) * 100).toFixed();

  const stats = getTaskStatsForEachDay(groupedTasks);

  const data = {
    stats,
    completed,
    total,
    percentage: !Number.isNaN(Number(percentage)) ? Number(percentage) : 0,
    tasks,
  };

  return json(data, { status: 200 });
}

export default function DayRoute() {
  const params = useParams<'day'>();
  const { completed, percentage, total, stats, tasks } =
    useLoaderData<typeof loader>();

  useRouteTransition();

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
      <div className="w-full max-w-sm bg-light-rgba dark:bg-dark-rgba">
        <h1>tasks for day: {params.day}</h1>
        <div>
          {tasks.map((task) => (
            <div key={task.id}>
              <span>{task.body}</span>
            </div>
          ))}
        </div>
      </div>
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
