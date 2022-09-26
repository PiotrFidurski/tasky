import nProgress from 'nprogress';

import { useEffect } from 'react';

import { z } from 'zod';

import { format, isValid } from 'date-fns';

import { LoaderArgs, json } from 'remix';

import {
  Form,
  Outlet,
  useCatch,
  useLoaderData,
  useNavigate,
  useTransition,
} from '@remix-run/react';

import { actionTypes } from '~/server/actions/actionTypes';
import { action } from '~/server/actions/task.server';
import { getTasksForDay, groupTasksByScheduledFor } from '~/server/models/task';
import { requireUserId } from '~/server/session/auth.server';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';
import { Calendar } from '~/components/Widgets/Calendar';
import { DayLink } from '~/components/Widgets/Calendar/components/DayLink';
import { CompletedTasks } from '~/components/Widgets/CompletedTasks';
import { Task } from '~/components/Widgets/Task';

import { badRequest } from '~/utils/badRequest';
import { DATE_FORMAT } from '~/utils/date';
import { getTaskStatsForEachDay, getTotalTasksCount } from '~/utils/taskStats';

export { action };

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

  const [tasks, groupedTasks] = await Promise.all([
    getTasksForDay({
      userId,
      day,
      take: 8,
    }),
    groupTasksByScheduledFor(userId),
  ]);

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
  const { completed, percentage, total, stats, tasks } =
    useLoaderData<typeof loader>();
  const transition = useTransition();

  useEffect(() => {
    if (
      transition.state === 'idle' ||
      transition.location?.pathname === '/logout' ||
      transition.location?.pathname === '/login'
    )
      nProgress.done();
    else nProgress.start();
  }, [transition.location?.pathname, transition.state]);

  return (
    <>
      <div className="lg:sticky top-2 h-max">
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
      </div>
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      <Form method="post">
        <input type="hidden" name="id" value={tasks[tasks.length - 1].id} />
        <Button
          name="_action"
          value={actionTypes.LOAD_MORE_TASKS}
          type="submit"
        >
          load more
        </Button>
      </Form>
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
