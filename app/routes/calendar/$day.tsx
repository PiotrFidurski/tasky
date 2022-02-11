import { Task } from '@prisma/client';
import { action } from '~/actions/task.server';
import { getTasksForDay, getUnscheduledTasks } from '~/models/task';

import { LoaderFunction, json, useLoaderData, useParams } from 'remix';

import Calendar from '~/components/Calendar/Calendar';
import { TaskComponent } from '~/components/TaskComponent';
import {
  CalendarLayout,
  ColumnLayout,
  ContentLayout,
} from '~/components/layouts';

import { badRequest } from '~/utils/badRequest';
import { createCalendar } from '~/utils/date';

type LoaderData = {
  tasksForTheDay: Task[];
  tasks: Task[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { day } = params;

  if (!day) {
    throw badRequest("Sorry we can't find anything for that day");
  }

  const [tasksForTheDay, tasks] = await Promise.all([
    getTasksForDay(day),
    getUnscheduledTasks(),
  ]);

  const data: LoaderData = {
    tasksForTheDay,
    tasks,
  };

  return json(data, { status: 200 });
};

export { action };

export default function DayRoute() {
  const { tasksForTheDay, tasks } = useLoaderData<LoaderData>();

  const { day } = useParams<'day'>();

  const calendarMatrix = createCalendar();

  return (
    <ContentLayout>
      <CalendarLayout>
        <Calendar data={calendarMatrix} />
      </CalendarLayout>
      <ColumnLayout aria-label={day}>
        <div className="shadow-md border-b min-h-[4rem] items-center flex px-4 mb-2">
          <h2 className="font-bold text-slate-600 text-xl">{day}</h2>
        </div>
        {tasksForTheDay.map((task) => (
          <TaskComponent key={task.id} task={task} />
        ))}
      </ColumnLayout>
      <ColumnLayout>
        <div className="shadow-md border-b min-h-[4rem] items-center flex px-4 mb-2">
          <h2 className="font-bold text-slate-600 text-xl">Backlog</h2>
        </div>
        {tasks.map((task) => (
          <TaskComponent key={task.id} task={task} />
        ))}
      </ColumnLayout>
    </ContentLayout>
  );
}
