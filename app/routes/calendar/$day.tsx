import { Task } from '@prisma/client';
import { action } from '~/actions/task.server';

import { LoaderFunction, json, useLoaderData, useParams } from 'remix';

import { getTasksForDay, getUnscheduledTasks } from '~/models/task';

import { TaskComponent } from '~/components/TaskComponent';

import { badRequest } from '~/utils/badRequest';

type LoaderData = {
  tasksForTheDay: Task[];
  tasks: Task[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { day } = params;

  if (!day) {
    throw badRequest("Sorry we can't find anything for that day");
  }

  const tasksForTheDay = await getTasksForDay(day);

  const tasks = await getUnscheduledTasks();

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

  return (
    <section className="max-w-full w-full flex items-start" aria-label={day}>
      <div className="max-w-md w-full">
        <div className="shadow-md border-b min-h-[4rem] items-center flex px-4 mb-2">
          <h1 className="font-bold text-slate-600 text-xl">{day}</h1>
        </div>
        {tasksForTheDay.map((task) => (
          <TaskComponent key={task.id} task={task} />
        ))}
      </div>
      <div className="max-w-md w-full">
        <div className="shadow-md border-b min-h-[4rem] items-center flex px-4 mb-2">
          <h1 className="font-bold text-slate-600 text-xl">Backlog</h1>
        </div>
        {tasks.map((task) => (
          <TaskComponent key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
