import { z } from 'zod';

import { ActionArgs, json, redirect } from 'remix';

import { schema } from '~/validation/task';

import { updateTask } from '~/server/models/task';
import { getAuthUserId } from '~/server/session/session.server';

import { getFormattedErrors } from '~/utils/getFormattedErrors';

export function unauthorizedResponse(message: string) {
  return json({ error: message }, { status: 401, statusText: 'Unauthorized' });
}

export async function action({ request }: ActionArgs) {
  try {
    const userId = await getAuthUserId(request);

    const form = await request.formData();

    const ownerId = form.get('ownerId');

    const id = form.get('id');

    if (userId !== ownerId) {
      throw unauthorizedResponse('You are not allowed to update this task.');
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
  } catch (error) {
    return getFormattedErrors(error);
  }
}
