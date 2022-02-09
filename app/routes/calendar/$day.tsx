import { Task } from '@prisma/client';
import { ZodError, z } from 'zod';

import {
  ActionFunction,
  LoaderFunction,
  json,
  useLoaderData,
  useParams,
} from 'remix';

import {
  getTasksForDay,
  getUnscheduledTasks,
  markTaskComplete,
  markTaskUncomplete,
  scheduleTask,
  unscheduleTask,
} from '~/models/task';

import { requireUserId } from '~/session/auth.server';

import { TaskComponent } from '~/components/TaskComponent';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

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

export const action: ActionFunction = async ({ request }) => {
  try {
    await requireUserId(request);

    const form = await request.formData();

    const actionType = form.get('_action');

    const id = form.get('id');
    const dateField = form.get('date');

    if (actionType) {
      const taskId = z
        .string({ invalid_type_error: 'expected an id.' })
        .parse(id);

      switch (actionType) {
        case 'complete': {
          return await markTaskComplete(taskId);
        }

        case 'uncomplete': {
          return await markTaskUncomplete(taskId);
        }

        case 'scheduleTask': {
          const date = z
            .string({ invalid_type_error: 'expected a string.' })
            .optional()
            .default('')
            .parse(dateField);

          return await scheduleTask(taskId, date);
        }

        case 'unscheduleTask': {
          return await unscheduleTask(taskId);
        }

        default: {
          throw badRequest(`Unknown action ${actionType}`);
        }
      }
    }
    return null;
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten();

      return badRequest({
        errors: { ...errors.fieldErrors },
      });
    }

    return getErrorMessage(error);
  }
};

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
