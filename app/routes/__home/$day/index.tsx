import { Task } from '@prisma/client';
import { getTasksForDay } from '~/models/task';
import { getAuthUserId } from '~/session/session.server';

import { LoaderFunction, useLoaderData, useParams } from 'remix';

import { TaskComponent } from '~/components/Tasks/TaskComponent';

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getAuthUserId(request);
  if (!params.day) return null;
  const tasks = getTasksForDay(params.day, userId);

  return tasks;
};

export default function IndexRoute() {
  const loaderData = useLoaderData<Task[]>();
  const params = useParams<'day'>();

  return (
    <div>
      <h1>tasks for day: {params.day}</h1>
      <div>
        {loaderData.map((task) => (
          <TaskComponent task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}
