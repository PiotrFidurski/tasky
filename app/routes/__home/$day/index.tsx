import { Task } from '@prisma/client';
import { isValid } from 'date-fns';
import { ZodError, z } from 'zod';
import { getTasksForDay } from '~/models/task';
import { getAuthUserId } from '~/session/session.server';

import { LoaderFunction, json, useLoaderData, useParams } from 'remix';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

type LoaderData = {
  tasks: Array<Task>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getAuthUserId(request);

  try {
    const day = z
      .string({ invalid_type_error: 'expected a string.' })
      .parse(params.day);

    if (!isValid(new Date(day))) {
      throw badRequest(
        'No tasks found for this date, please check if the date is a valid date format (yyyy-MM-dd) eg: "2022-02-22".',
        404
      );
    }

    const tasks = await getTasksForDay(day, userId);

    const data: LoaderData = {
      tasks,
    };

    return json(data, { status: 200 });
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
};

export default function IndexRoute() {
  const { tasks } = useLoaderData<LoaderData>();

  const params = useParams<'day'>();

  return (
    <div>
      <h1>tasks for day: {params.day}</h1>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <span>{task.body}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
