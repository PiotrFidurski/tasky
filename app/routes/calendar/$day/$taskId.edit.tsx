import { ZodError, z } from 'zod';

import { ActionFunction, LoaderArgs, json } from 'remix';

import { getTask } from '~/models/task';

import { EditTask } from '~/components/Modals/EditTask';

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

export const action: ActionFunction = async () => {
  // do task update here
  return null;
};

export default function EditTaskRoute() {
  return <EditTask />;
}
