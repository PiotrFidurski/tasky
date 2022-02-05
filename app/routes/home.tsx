import { Task, User } from '@prisma/client';
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from 'remix';
import * as z from 'zod';
import { ZodError } from 'zod';
import { zfd } from 'zod-form-data';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';
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
    <main>
      <h1 className="py-2 text-4xl text-slate-600">welcome {user.username}</h1>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="bg-blue-600 text-white px-2 rounded py-2"
        >
          logout
        </button>
      </Form>
      <div className="max-w-sm m-auto px-4">
        <Form method="post" className="py-4">
          <h2 aria-level={1} className="py-2 text-4xl text-slate-600">
            Create new task
          </h2>
          <FieldWrapper
            htmlFor="body"
            errorMessage={
              transition.state === 'idle' && actionData?.errors
                ? actionData.errors.body
                : ''
            }
          >
            <InputField required aria-label="body" name="body" id="body" />
          </FieldWrapper>
          <button
            className="py-2 bg-blue-600 text-white rounded px-2"
            type="submit"
          >
            Add task
          </button>
        </Form>
        <div>
          {tasks.map((task) => (
            <article
              key={task.id}
              className="py-2 px-2 bg-slate-200 mb-2 rounded flex items-center justify-between shadow-sm shadow-black"
            >
              <span className="font-semibold">{task.body}</span>
              <button
                type="button"
                className="bg-pink-600 text-white px-4 rounded"
              >
                delete
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
