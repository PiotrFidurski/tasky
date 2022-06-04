import { Task } from '@prisma/client';

import { createCookieSessionStorage, json, redirect } from 'remix';

if (!process.env.CREATE_TASK_DATA_SECRET) {
  throw new Error(
    'CREATE_TASK_DATA_SECRET must be set in your environment variables.'
  );
}

const createTaskDataStorage = createCookieSessionStorage({
  cookie: {
    name: 'temp_create_task_data',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.CREATE_TASK_DATA_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export function getCreateTaskDataSession(request: Request) {
  return createTaskDataStorage.getSession(request.headers.get('Cookie'));
}

type CreateTaskData = Pick<Task, 'body' | 'title'>;

export async function updateTaskDataSession(
  request: Request,
  data: CreateTaskData
) {
  const session = await getCreateTaskDataSession(request);

  session.set('createTaskData:title', data.title);
  session.set('createTaskData:body', data.body);

  return json(
    { success: true },
    {
      status: 200,
      headers: {
        'Set-Cookie': await createTaskDataStorage.commitSession(session),
      },
    }
  );
}

export async function destroyTaskDataSession(
  request: Request,
  path: string = '/'
) {
  const session = await getCreateTaskDataSession(request);

  return redirect(path, {
    headers: {
      'Set-Cookie': await createTaskDataStorage.destroySession(session),
    },
  });
}
