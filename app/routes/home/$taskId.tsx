import { Task } from '@prisma/client';

import { LoaderFunction, useLoaderData } from 'remix';

import { getTask } from '~/models/task';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

type LoaderData = {
  task: Task;
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const { taskId } = params;

    if (!taskId) {
      return null;
    }

    const task = await getTask(taskId);

    if (!task) {
      return badRequest("There used to be something here but now it's gone");
    }

    const data: LoaderData = {
      task,
    };

    return data;
  } catch (error) {
    return getErrorMessage(error);
  }
};

export default function TaskRoute() {
  const { task } = useLoaderData<LoaderData>();

  return <div>task route, {task?.body}</div>;
}
