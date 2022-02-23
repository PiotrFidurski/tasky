import { ZodError, z } from 'zod';
import {
  deleteTask,
  markTaskComplete,
  markTaskUncomplete,
  scheduleTask,
  unscheduleTask,
} from '~/models/task';
import { requireUserId } from '~/session/auth.server';

import { ActionFunction } from 'remix';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

import { actionTypes } from './actionTypes';

export const action: ActionFunction = async ({ request }) => {
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

      case actionTypes.MARK_TASK_UNCOMPLETE: {
        return await markTaskUncomplete(taskId);
      }

      case actionTypes.SCHEDULE_TASK: {
        const date = z
          .string({ invalid_type_error: 'expected a string.' })
          .optional()
          .default('')
          .parse(dateField);

        return await scheduleTask(taskId, date);
      }

      case actionTypes.UNSCHEDULE_TASK: {
        return await unscheduleTask(taskId);
      }

      case actionTypes.DELETE_TASK: {
        if (userId !== ownerId) {
          throw badRequest(`You are not allowed to delete this task.`);
        }

        return await deleteTask(taskId);
      }

      default: {
        throw badRequest(`Unknown action ${actionType}`);
      }
    }
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
