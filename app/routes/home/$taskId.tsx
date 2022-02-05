import { Task } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { db } from '~/db/db.server';
import { getErrorMessage } from '~/utils/getErrorMessage';

type LoaderData = {
  task: Task | null;
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const { taskId } = params;

    const task = await db.task.findFirst({ where: { id: taskId } });

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
