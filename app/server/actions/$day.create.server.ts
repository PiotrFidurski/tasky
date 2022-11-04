import { format } from 'date-fns';

import { ActionArgs, json } from 'remix';

import { scheduledForSchema, schema } from '~/validation/task';

import { createTask } from '~/server/models/task';
import { getAuthUserId } from '~/server/session/session.server';
import {
  SessionFields,
  destroyTaskDraftSession,
  getTaskDraftSession,
  updateTaskDraftSession,
} from '~/server/session/taskdraft.server';

import { DATE_FORMAT } from '~/utils/date';
import { getFormattedErrors } from '~/utils/getFormattedErrors';

import { actionTypes } from './actionTypes';

export function unauthorizedResponse(message: string) {
  return json({ error: message }, { status: 401, statusText: 'Unauthorized' });
}

export async function action({ params, request }: ActionArgs) {
  try {
    const userId = await getAuthUserId(request);

    const form = await request.formData();

    const actionType = form.get('_action');

    const path = `/${params.day}`;

    switch (actionType) {
      case actionTypes.DESTROY_DRAFT: {
        return await destroyTaskDraftSession({ request, redirectTo: path });
      }

      case actionTypes.CREATE_DRAFT_BODY: {
        const data = schema.parse(form);

        return await updateTaskDraftSession({
          request,
          data: { ...data, scheduledFor: '' },
          redirectTo: `/${params.day}/calendar`,
        });
      }

      case actionTypes.CREATE_DRAFT_DATE: {
        const createTaskDataSession = await getTaskDraftSession(request);

        const { scheduledFor } = scheduledForSchema.parse(form);

        const draft = {
          body: createTaskDataSession.get(SessionFields.body) || '',
          scheduledFor:
            createTaskDataSession.get('taskDraft.scheduledFor') || '',
        };

        return await updateTaskDraftSession({
          request,
          data: { ...draft, scheduledFor },
          redirectTo: `/${params.day}/create?date=${scheduledFor}`,
        });
      }

      case actionTypes.CREATE_TASK: {
        const { body } = schema.parse(form);

        const { scheduledFor } = scheduledForSchema.parse(form);

        await createTask({
          body,
          userId,
          scheduledFor: format(
            new Date(scheduledFor || params.day!),
            DATE_FORMAT
          ),
        });

        return await destroyTaskDraftSession({
          request,
          redirectTo: `/${scheduledFor}`,
        });
      }

      default: {
        return await destroyTaskDraftSession({ request, redirectTo: path });
      }
    }
  } catch (error) {
    return getFormattedErrors(error);
  }
}

export type CreateTaskAction = typeof action;
