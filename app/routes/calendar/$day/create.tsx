import { ZodError } from 'zod';
import { createTask } from '~/models/task';
import {
  getCreateTaskDataSession,
  updateTaskDataSession,
} from '~/session/createTaskData.server';
import { getAuthUserId } from '~/session/session.server';
import { schema } from '~/validation/task';

import { ActionFunction, LoaderFunction, redirect, useLoaderData } from 'remix';

import { CreateTask } from '~/components/Modals/CreateTask';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

type LoaderData = {
  title: string;
  body: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const createTaskDataSession = await getCreateTaskDataSession(request);

  const data: LoaderData = {
    title: createTaskDataSession.get('createTaskData:title') || '',
    body: createTaskDataSession.get('createTaskData:body') || '',
  };

  return data;
};

export const action: ActionFunction = async ({ params, request }) => {
  try {
    const userId = await getAuthUserId(request);

    const form = await request.formData();

    const { body, title } = schema.parse(form);

    const type = form.get('create_task_data');

    if (type) {
      return await updateTaskDataSession(request, { title, body });
    }

    await createTask({ body, title, userId });

    return redirect(`/calendar/${params.day}`);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten();

      return badRequest({
        errors: { ...errors.fieldErrors },
      });
    }

    throw badRequest({ message: getErrorMessage(error) });
  }
};

export default function CreateTaskRoute() {
  const { title, body } = useLoaderData<LoaderData>();

  return <CreateTask title={title} body={body} />;
}
