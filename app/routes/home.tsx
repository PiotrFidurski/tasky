import { User } from '@prisma/client';
import { ZodError, z } from 'zod';
import { createTask } from '~/models/task';
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
};

type ActionData = z.infer<typeof ZodTaskErrros>;

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const user = await getUserById(userId);

  if (!user) {
    throw badRequest('Something went wrong getting the user session.');
  }

  const data: LoaderData = {
    user,
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
  const { user } = useLoaderData<LoaderData>();

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
