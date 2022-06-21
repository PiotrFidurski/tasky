import { Task } from '@prisma/client';

import { createCookieSessionStorage, json } from 'remix';

const taskDraftStorage = createCookieSessionStorage({
  cookie: {
    name: 'task_draft',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.TASK_DRAFT_SECRET || 'secret'],
    secure: process.env.NODE_ENV === 'production',
  },
});

export function getTaskDraftSession(request: Request) {
  return taskDraftStorage.getSession(request.headers.get('Cookie'));
}

type CreateTaskData = Pick<Task, 'body' | 'title'>;

export async function updateTaskDraftSession(
  request: Request,
  data: CreateTaskData
) {
  const session = await getTaskDraftSession(request);

  session.set('taskDraft:title', data.title);
  session.set('taskDraft:body', data.body);

  return json(
    { success: true },
    {
      status: 200,
      headers: {
        'Set-Cookie': await taskDraftStorage.commitSession(session),
      },
    }
  );
}

export async function destroyTaskDraftSession(request: Request) {
  const session = await getTaskDraftSession(request);

  return json(
    { success: true },
    {
      headers: {
        'Set-Cookie': await taskDraftStorage.destroySession(session),
      },
    }
  );
}
