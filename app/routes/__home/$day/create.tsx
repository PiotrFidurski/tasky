import { useLoaderData } from '@remix-run/react';
import { format } from 'date-fns';
import { ZodError } from 'zod';
import { createTask } from '~/models/task';
import { dateSchema, schema } from '~/validation/task';

import { ActionFunction, LoaderFunction } from 'remix';

import { getAuthUserId } from '~/session/session.server';
import {
  destroyTaskDraftSession,
  getTaskDraftSession,
  updateTaskDraftSession,
} from '~/session/taskdraft.server';

import { CreateTask } from '~/components/Modals/CreateTask';
import {
  CREATE_DRAFT,
  DESTROY_DRAFT,
  SUBMIT_FORM,
} from '~/components/Modals/actionTypes';

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

    const actionType = form.get('_action');

    const path = `/${params.day}`;

    switch (actionType) {
      case DESTROY_DRAFT: {
        return await destroyTaskDraftSession({ request, redirectTo: path });
      }

      case CREATE_DRAFT: {
        const data = schema.parse(form);

        return await updateTaskDraftSession({
          request,
          data,
          redirectTo: `/${params.day}/calendar`,
        });
      }

      case SUBMIT_FORM: {
        const { body, title } = schema.parse(form);
        const { date } = dateSchema.parse(form);

        await createTask({
          body,
          title,
          userId,
          scheduledFor: format(new Date(date), DATE_FORMAT),
        });

        return await destroyTaskDraftSession({ request, redirectTo: path });
      }

      default: {
        return await destroyTaskDraftSession({ request, redirectTo: path });
      }
    }
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
