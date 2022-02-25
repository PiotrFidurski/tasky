import { Task } from '@prisma/client';
import { isValid } from 'date-fns';
import { ZodError, z } from 'zod';
import { action } from '~/actions/task.server';
import {
  getTasksForDay,
  getUnscheduledTasks,
  groupTasksByScheduledFor,
} from '~/models/task';
import { getUserById } from '~/models/user';
import { getAuthUserId } from '~/session/session.server';

import {
  LoaderFunction,
  Outlet,
  json,
  useCatch,
  useLoaderData,
  useParams,
} from 'remix';

import Calendar from '~/components/Calendar/root';
import DayTasksList from '~/components/Tasks/DayTasksList';
import UnscheduledTasksList from '~/components/Tasks/UnscheduledTasksList';
import {
  CalendarLayout,
  ColumnLayout,
  ContentLayout,
} from '~/components/layout';

import { badRequest } from '~/utils/badRequest';
import { getCalendarData } from '~/utils/date';
import { getDayStats } from '~/utils/getDayStats';
import { getErrorMessage } from '~/utils/getErrorMessage';

export type LoaderData = {
  tasksForTheDay: Task[];
  unscheduledTasks: Task[];
  calendarData: Array<Array<string>>;
  stats: Record<string, number[]>;
  userId: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getAuthUserId(request);

  try {
    const user = await getUserById(userId!);

    if (!user) {
      throw new Error("Couldn't find user with that id.");
    }

    const day = z
      .string({ invalid_type_error: 'expected a string.' })
      .parse(params.day);

    const calendarData = getCalendarData({ date: new Date() });

    const [tasksForTheDay, unscheduledTasks, groupedTasks] = await Promise.all([
      getTasksForDay(day, user.id),
      getUnscheduledTasks(user.id),
      groupTasksByScheduledFor(user.id),
    ]);

    // check if date is valid date.
    if (!isValid(new Date(day))) {
      throw new Error(
        `No tasks found for this date, please check if the date is a valid date format (yyyy-MM-dd) eg: "2022-02-22".`
      );
    }

    const stats = getDayStats(groupedTasks);

    const data: LoaderData = {
      tasksForTheDay,
      unscheduledTasks,
      calendarData,
      stats,
      // might not be needed later when authcontext exists
      userId: user.id,
    };

    return json(data, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.message);
    }

    const message = getErrorMessage(error);

    throw badRequest(message);
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
    <ContentLayout className="dark:text-custom__ghostly text-custom__gray">
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </ContentLayout>
  );
}
