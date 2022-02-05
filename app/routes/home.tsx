import { Task, User } from '@prisma/client';
import {
  ActionFunction,
  json,
  LoaderFunction,
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from 'remix';
import * as z from 'zod';
import { ZodError } from 'zod';
import { zfd } from 'zod-form-data';
import { CreateTask } from '~/components/CreateTask';
import { Sidebar } from '~/components/Sidebar';
import { TaskComponent } from '~/components/TaskComponent';
import { db } from '~/db/db.server';
import { getUserSession } from '~/session/session.server';
import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

type LoaderData = {
  user: User;
  tasks: Task[];
};

const ZodErrros = z.object({
  errors: z.object({
    body: z.array(z.string()),
  }),
});

export type ActionData = z.infer<typeof ZodErrros>;

const schema = zfd.formData({
  body: zfd.text(
    z
      .string({ required_error: 'Task body is required.' })
      .min(3, 'Body should be at least 3 characters long.')
  ),
});

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUserSession({
    request,
  });

  if (!session.has('userId')) {
    return redirect('/login');
  }

  const user = await db.user.findFirst({
    where: { id: session.data.userId },
  });

  const tasks = await db.task.findMany({ orderBy: { createdAt: 'desc' } });

  if (!user) {
    return badRequest('Something went wrong getting user information.');
  }

  const data: LoaderData = {
    user,
    tasks,
  };

  return json(data, { status: 200 });
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const session = await getUserSession({ request });

    const userId = session.get('userId');

    const form = await request.formData();

    const actionType = form.get('_action');

    const id = form.get('id') as string;

    if (actionType) {
      switch (actionType) {
        case 'complete': {
          await db.task.update({
            where: { id },
            data: { isComplete: true },
          });

          return null;
        }

        case 'uncomplete': {
          await db.task.update({ where: { id }, data: { isComplete: false } });

          return null;
        }
        default:
          break;
      }
    }

    const { body } = schema.parse(form);

    if (userId) {
      await db.task.create({
        data: {
          body,
          userId,
        },
      });
    }

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

  const transition = useTransition();

  return (
    <main className="flex w-full">
      <Sidebar user={user} />
      <div className="px-4 py-4 max-w-xl w-full border-r border-slate-300">
        <CreateTask
          errorMessage={
            transition.state === 'idle' && actionData?.errors
              ? actionData.errors.body
              : ''
          }
        />
        <div className="flex flex-col gap-2 max-w-xl mt-6">
          {tasks.map((task) => (
            <TaskComponent task={task} key={task.id} />
          ))}
        </div>
      </div>
      <Outlet />
    </main>
  );
}
