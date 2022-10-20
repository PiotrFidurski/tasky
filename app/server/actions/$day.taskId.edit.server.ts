import { ZodError, z } from 'zod';

import { LoaderArgs, json } from 'remix';

import { getTask } from '~/server/models/task';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

export async function loader({ params }: LoaderArgs) {
  try {
    const taskId = z
      .string({
        invalid_type_error: 'expected a string',
      })
      .parse(params.taskId);

    const task = await getTask(taskId);

    if (!task) {
      throw json("Couldn't find task with provided taskId.", { status: 404 });
    }

    const data = {
      body: task.body,
      scheduledFor: task.scheduledFor,
    };

    return data;
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten();

      throw badRequest({ errors });
    }

    if (error instanceof Response) {
      throw error;
    }

    throw badRequest({ message: getErrorMessage(error) });
  }
}
