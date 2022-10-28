import { z } from 'zod';

import { isValid } from 'date-fns';

import { LoaderArgs, json } from 'remix';

import { getTasksForDay, groupTasksByScheduledFor } from '~/server/models/task';
import { requireUserId } from '~/server/session/auth.server';

import { badRequest } from '~/utils/badRequest';
import { getTaskStatsForEachDay, getTotalTasksCount } from '~/utils/taskStats';

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

export type DayLoader = typeof loader;
