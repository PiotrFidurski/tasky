import { Task } from '@prisma/client';

import { LoaderFunction, useCatch, useLoaderData } from 'remix';

import { getTask } from '~/models/task';

import { badRequest } from '~/utils/badRequest';

type LoaderData = {
  task: Task;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { taskId } = params;

  if (!taskId) {
    return null;
  }

  const task = await getTask(taskId);

  if (!task) {
    throw badRequest("There used to be something here but now it's gone");
  }

  const data: LoaderData = {
    task,
  };

  return data;
};

export default function TaskRoute() {
  const { task } = useLoaderData<LoaderData>();

  return <div>task route, {task?.body}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
