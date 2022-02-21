import { Task } from '@prisma/client';
import { ZodError, z } from 'zod';
import { action } from '~/actions/task.server';
import {
  getTasksForDay,
  getUnscheduledTasks,
  groupTasksByScheduledFor,
} from '~/models/task';

import {
  LoaderFunction,
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
import { GroupedTask } from '~/utils/getDayStats';
import { getErrorMessage } from '~/utils/getErrorMessage';

export type LoaderData = {
  tasksForTheDay: Task[];
  unscheduledTasks: Task[];
  calendarData: Array<Array<string>>;
  groupedTasks: Array<GroupedTask>;
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const day = z
      .string({ invalid_type_error: 'expected a string.' })
      .parse(params.day);

    const calendarData = getCalendarData({ date: new Date() });

    const [tasksForTheDay, unscheduledTasks, groupedTasks] = await Promise.all([
      getTasksForDay(day),
      getUnscheduledTasks(),
      groupTasksByScheduledFor(),
    ]);

    const data: LoaderData = {
      tasksForTheDay,
      unscheduledTasks,
      calendarData,
      groupedTasks,
    };

    return json(data, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.message);
    }

    return getErrorMessage(error);
  }
};

export { action };

export default function DayRoute() {
  const { tasksForTheDay, unscheduledTasks, calendarData, groupedTasks } =
    useLoaderData<LoaderData>();

  const { day } = useParams<'day'>();

  return (
    <ContentLayout>
      <CalendarLayout>
        <Calendar data={calendarData} groupedTasks={groupedTasks} />
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
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
