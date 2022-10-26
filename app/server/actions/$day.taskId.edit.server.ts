import { ZodError, z } from 'zod';

import { ActionArgs, json, redirect } from 'remix';

import { schema } from '~/validation/task';

import { updateTask } from '~/server/models/task';
import { getAuthUserId } from '~/server/session/session.server';
import { destroyTaskDraftSession } from '~/server/session/taskdraft.server';

import { UPDATE_TASK } from '~/components/Modals/actionTypes';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

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
      case UPDATE_TASK: {
        const ownerId = form.get('ownerId');

        const id = form.get('id');

        if (userId !== ownerId) {
          throw unauthorizedResponse(
            'You are not allowed to update this task.'
          );
        }

        const { body } = schema.parse(form);

        const scheduledForField = form.get('scheduledFor');

        const scheduledFor = z
          .string({ invalid_type_error: 'expected a string.' })
          .parse(scheduledForField);

        const taskId = z
          .string({ invalid_type_error: 'expected as string' })
          .parse(id);

        await updateTask({ body, id: taskId });

        return redirect(`/${scheduledFor}`);
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
