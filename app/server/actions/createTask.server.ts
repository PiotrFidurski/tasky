import { ZodError } from 'zod';

import { format } from 'date-fns';

import { ActionArgs } from 'remix';

import { scheduledForSchema, schema } from '~/validation/task';

import { createTask } from '~/server/models/task';
import { getAuthUserId } from '~/server/session/session.server';
import {
  destroyTaskDraftSession,
  getTaskDraftSession,
  updateTaskDraftSession,
} from '~/server/session/taskdraft.server';

import {
  CREATE_DRAFT_BODY,
  CREATE_DRAFT_DATE,
  DESTROY_DRAFT,
  SUBMIT_FORM,
} from '~/components/Modals/actionTypes';

import { badRequest } from '~/utils/badRequest';
import { DATE_FORMAT } from '~/utils/date';
import { getErrorMessage } from '~/utils/getErrorMessage';

export async function action({ params, request }: ActionArgs) {
  try {
    const userId = await getAuthUserId(request);

    const form = await request.formData();

    const actionType = form.get('_action');

    const path = `/${params.day}`;

    switch (actionType) {
      case DESTROY_DRAFT: {
        return await destroyTaskDraftSession({ request, redirectTo: path });
      }

      case CREATE_DRAFT_BODY: {
        const data = schema.parse(form);

        return await updateTaskDraftSession({
          request,
          data: { ...data, scheduledFor: '' },
          redirectTo: `/${params.day}/calendar`,
        });
      }

      case CREATE_DRAFT_DATE: {
        const createTaskDataSession = await getTaskDraftSession(request);

        const { scheduledFor } = scheduledForSchema.parse(form);

        const draft = {
          title: createTaskDataSession.get('taskDraft:title') || '',
          body: createTaskDataSession.get('taskDraft:body') || '',
          scheduledFor:
            createTaskDataSession.get('taskDraft.scheduledFor') || '',
        };

        return await updateTaskDraftSession({
          request,
          data: { ...draft, scheduledFor },
          redirectTo: `/${params.day}/create?date=${scheduledFor}`,
        });
      }

      case SUBMIT_FORM: {
        const { body } = schema.parse(form);
        const { scheduledFor } = scheduledForSchema.parse(form);

        await createTask({
          body,
          userId,
          scheduledFor: format(new Date(scheduledFor), DATE_FORMAT),
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
    if (error instanceof ZodError) {
      const errors = error.flatten();

      return badRequest({
        errors: { ...errors.fieldErrors },
      });
    }

    throw badRequest({ message: getErrorMessage(error) });
  }
}
