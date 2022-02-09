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

import { createTask, getManyTasks } from '~/models/task';
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
    <main className="flex w-full relative">
      <Sidebar user={user} />
      <div className="px-4 py-4 max-w-xl w-full border-r border-slate-300 ml-[16rem]">
        <CreateTask errorMessage={fieldErrors?.body || ''} />
      </div>
      <div className="max-w-lg w-full px-2">
        <div className="shadow-md border-b min-h-[4rem] items-center flex px-4 mb-2">
          <h2 className="font-bold text-slate-600 text-xl">Your tasks.</h2>
        </div>
        {tasks.map((task) => (
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
