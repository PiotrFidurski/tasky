import { format } from 'date-fns';
import { ZodError } from 'zod';
import { createTask } from '~/models/task';
import { getAuthUserId } from '~/session/session.server';
import {
  destroyTaskDraftSession,
  getTaskDraftSession,
  updateTaskDraftSession,
} from '~/session/taskdraft.server';
import { dateSchema, schema } from '~/validation/task';

import { ActionFunction, LoaderFunction, useLoaderData } from 'remix';

import { CreateTask } from '~/components/Modals/CreateTask';
import { CREATE_DRAFT, DESTROY_DRAFT } from '~/components/Modals/actionTypes';

import { badRequest } from '~/utils/badRequest';
import { DATE_FORMAT } from '~/utils/date';
import { getErrorMessage } from '~/utils/getErrorMessage';

type LoaderData = {
  title: string;
  body: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const createTaskDataSession = await getTaskDraftSession(request);

  const data: LoaderData = {
    title: createTaskDataSession.get('taskDraft:title') || '',
    body: createTaskDataSession.get('taskDraft:body') || '',
  };

  return data;
};

export const action: ActionFunction = async ({ params, request }) => {
  try {
    const userId = await getAuthUserId(request);
    const form = await request.formData();
    const destroyDraft = form.get(DESTROY_DRAFT);
    const taskDraft = form.get(CREATE_DRAFT);

    if (destroyDraft) {
      return await destroyTaskDraftSession(request);
    }

    const { body, title } = schema.parse(form);

    if (taskDraft) {
      return await updateTaskDraftSession(request, {
        title,
        body,
      });
    }

    const { date } = dateSchema.parse(form);

    await createTask({
      body,
      title,
      userId,
      scheduledFor: format(new Date(date), DATE_FORMAT),
    });

    return await destroyTaskDraftSession(request, true, `/${params.day}`);
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
  const draftData = useLoaderData<LoaderData>();

  return <CreateTask draft={draftData} />;
}
