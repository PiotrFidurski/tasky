import { ZodError, z } from 'zod';

import { isValid } from 'date-fns';

import { ActionArgs, json } from 'remix';

import {
  deleteTask,
  markTaskComplete,
  markTaskIncomplete,
  scheduleTask,
  unscheduleTask,
} from '~/models/task';

import { requireUserId } from '~/server/session/auth.server';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

import { actionTypes } from './actionTypes';

function unauthorizedResponse(message: string) {
  return json({ error: message }, { status: 401, statusText: 'Unauthorized' });
}

export async function action({ request }: ActionArgs) {
  try {
    const userId = await requireUserId(request);

    const form = await request.formData();

    const actionType = form.get('_action');

    const id = form.get('id');
    const dateField = form.get('date');
    const ownerId = form.get('ownerId');
    const taskId = z
      .string({ invalid_type_error: 'expected an id.' })
      .parse(id);

    switch (actionType) {
      case actionTypes.MARK_TASK_COMPLETE: {
        return await markTaskComplete(taskId);
      }

      case actionTypes.MARK_TASK_INCOMPLETE: {
        return await markTaskIncomplete(taskId);
      }

      case actionTypes.SCHEDULE_TASK: {
        const date = z
          .string({ invalid_type_error: 'expected a string.' })
          .parse(dateField);

        if (!isValid(new Date(date))) {
          throw badRequest(`${date} is not a valid date format.`);
        }

        return await scheduleTask(taskId, date);
      }

      case actionTypes.UNSCHEDULE_TASK: {
        return await unscheduleTask(taskId);
      }

      case actionTypes.DELETE_TASK: {
        if (userId !== ownerId) {
          throw unauthorizedResponse(
            'You are not allowed to delete this task.'
          );
        }

        return await deleteTask(taskId);
      }

      case actionTypes.UPDATE_TASK: {
        if (userId !== ownerId) {
          throw unauthorizedResponse(
            'You are not allowed to update this task.'
          );
        }

        // update task here
        return null;
      }

      default: {
        throw badRequest(`Unknown action ${actionType}`);
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten();

      throw badRequest({ errors });
    }

    if (error instanceof Response) {
      throw error;
    }

    const message = getErrorMessage(error);

    throw badRequest(message);
  }
}
