import { ZodError } from 'zod';

import { format } from 'date-fns';

import { ActionArgs } from 'remix';

import { dateSchema, schema } from '~/validation/task';

import { createTask } from '~/server/models/task';
import { getAuthUserId } from '~/server/session/session.server';
import {
  destroyTaskDraftSession,
  updateTaskDraftSession,
} from '~/server/session/taskdraft.server';

import {
  CREATE_DRAFT,
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
}
