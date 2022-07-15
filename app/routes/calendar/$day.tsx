import { Task } from '@prisma/client';
import { Outlet, useCatch, useLoaderData, useParams } from '@remix-run/react';
import { ZodError, z } from 'zod';
import { action } from '~/actions/task.server';
import {
  getTasksForDay,
  getUnscheduledTasks,
  groupTasksByScheduledFor,
} from '~/models/task';

import { LoaderFunction, json } from 'remix';

import { getAuthUserId } from '~/session/session.server';

import { Calendar } from '~/components/Calendar/root';
import { DayTasksList } from '~/components/Tasks/DayTasksList';
import { UnscheduledTasksList } from '~/components/Tasks/UnscheduledTasksList';
import {
  CalendarLayout,
  ColumnLayout,
  ContentLayout,
} from '~/components/layout';

import { badRequest } from '~/utils/badRequest';
import { getCalendarData, isValidDateFormat } from '~/utils/date';
import { getErrorMessage } from '~/utils/getErrorMessage';
import { getTaskStatsForEachDay } from '~/utils/taskStats';

export type LoaderData = {
  tasksForTheDay: Task[];
  unscheduledTasks: Task[];
  calendarData: Array<Array<string>>;
  stats: Record<string, number[]>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getAuthUserId(request);

  try {
    const day = z
      .string({ invalid_type_error: 'expected a string.' })
      .parse(params.day);

    if (!isValidDateFormat(day)) {
      throw badRequest(
        'No tasks found for this date, please check if the date is a valid date format (yyyy-MM-dd) eg: "2022-02-22".',
        404
      );
    }

    const calendarData = getCalendarData({ date: new Date() });

    const [tasksForTheDay, unscheduledTasks, groupedTasks] = await Promise.all([
      getTasksForDay(day, userId),
      getUnscheduledTasks(userId),
      groupTasksByScheduledFor(userId),
    ]);

    const stats = getTaskStatsForEachDay(groupedTasks);

    const data: LoaderData = {
      tasksForTheDay,
      unscheduledTasks,
      calendarData,
      stats,
    };

    return json(data, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten();

      throw badRequest({ errors });
    }

    if (error instanceof Response) {
      throw error;
    }

    throw badRequest({ message: getErrorMessage(error) });
  }
};

export { action };

export default function DayRoute() {
  const { tasksForTheDay, unscheduledTasks, calendarData, stats } =
    useLoaderData<LoaderData>();

  const { day } = useParams<'day'>();
  return (
    <>
      <ContentLayout>
        <CalendarLayout>
          <Calendar data={calendarData} stats={stats} />
        </CalendarLayout>
        <ColumnLayout aria-label={day}>
          <DayTasksList
            dayTasks={tasksForTheDay}
            unscheduledTasks={unscheduledTasks}
          />
        </ColumnLayout>
        <ColumnLayout>
          <UnscheduledTasksList
            unscheduledTasks={unscheduledTasks}
            dayTasks={tasksForTheDay}
          />
        </ColumnLayout>
      </ContentLayout>
      <Outlet />
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <ContentLayout>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <p>Status: {caught.statusText}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </ContentLayout>
  );
}
