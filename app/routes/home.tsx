import { Task, User } from '@prisma/client';
import { ZodError, z } from 'zod';

import {
  ActionFunction,
  LoaderFunction,
  Outlet,
  json,
  redirect,
  useActionData,
  useCatch,
  useLoaderData,
} from 'remix';

import {
  createTask,
  getManyTasks,
  markTaskComplete,
  markTaskUncomplete,
  scheduleTask,
  unscheduleTask,
} from '~/models/task';
import { getUserById } from '~/models/user';

import { ZodTaskErrros, schema } from '~/validation/task';

import { requireUserId } from '~/session/auth.server';

import { CreateTask } from '~/components/CreateTask';
import { Sidebar } from '~/components/Sidebar';
import { TaskComponent } from '~/components/TaskComponent';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';
import { useErrors } from '~/utils/hooks/useErrors';

type LoaderData = {
  user: User;
  tasks: Task[];
};

type ActionData = z.infer<typeof ZodTaskErrros>;

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const user = await getUserById(userId);

  if (!user) {
    throw badRequest('Something went wrong getting the user session.');
  }

  const tasks = await getManyTasks();

  const data: LoaderData = {
    user,
    tasks,
  };

  return json(data, { status: 200 });
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const userId = await requireUserId(request);

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

        case 'assignToDate': {
          const date = z
            .string({ invalid_type_error: 'expected a string.' })
            .optional()
            .default('')
            .parse(dateField);

          return await scheduleTask(taskId, date);
        }

        case 'unassignFromDate': {
          return await unscheduleTask(taskId);
        }

        default: {
          throw badRequest(`Unknown action ${actionType}`);
        }
      }
    }

    const { body } = schema.parse(form);

    await createTask(body, userId);

    return redirect('/home');
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

export default function HomeRoute() {
  const { user, tasks } = useLoaderData<LoaderData>();

  const actionData = useActionData<ActionData>();

  const { fieldErrors } = useErrors(actionData);

  return (
    <main className="flex w-full">
      <Sidebar user={user} />
      <div className="px-4 py-4 max-h-screen max-w-xl w-full border-r border-slate-300">
        <CreateTask errorMessage={fieldErrors?.body || ''} />
        <div className="flex flex-col gap-2 max-w-xl mt-6 overflow-auto h-[calc(100%-12rem)]">
          {tasks
            .filter((task) => task.scheduledFor)
            .map((task) => (
              <TaskComponent task={task} key={task.id} />
            ))}
        </div>
      </div>
      <div>
        {tasks
          .filter((task) => !task.scheduledFor)
          .map((task) => (
            <TaskComponent task={task} key={task.id} />
          ))}
      </div>
      <Outlet />
    </main>
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
