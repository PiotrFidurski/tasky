import { Task, User } from '@prisma/client';
import { ZodError, z } from 'zod';
import { createTask, getManyTasks } from '~/models/task';
import { getUserById } from '~/models/user';
import { requireUserId } from '~/session/auth.server';
import { ZodTaskErrros, schema } from '~/validation/task';

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

import { Sidebar } from '~/components/Sidebar';
import { CreateTask } from '~/components/Tasks/CreateTask';
import { TaskComponent } from '~/components/Tasks/TaskComponent';
import {
  ColumnLayout,
  ContentLayout,
  MainLayout,
  SidebarLayout,
} from '~/components/layout';

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
    <MainLayout>
      <SidebarLayout>
        <Sidebar user={user} />
      </SidebarLayout>

      <ContentLayout>
        <ColumnLayout>
          <CreateTask errorMessage={fieldErrors?.body || ''} />
        </ColumnLayout>
        <ColumnLayout>
          <div className="px-2">
            <div className="shadow-md border-b min-h-[4rem] items-center flex px-4 mb-2">
              <h2 className="font-bold text-slate-600 text-xl">
                Latests tasks.
              </h2>
            </div>
            {tasks.map((task) => (
              <TaskComponent task={task} key={task.id} />
            ))}
          </div>
        </ColumnLayout>
        <Outlet />
      </ContentLayout>
    </MainLayout>
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
