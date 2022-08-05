import { Task } from '@prisma/client';

import { createCookieSessionStorage, redirect } from 'remix';

export const taskDraftSessionStorage = createCookieSessionStorage({
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
  return taskDraftSessionStorage.getSession(request.headers.get('Cookie'));
}

type CreateTaskData = Pick<Task, 'body' | 'scheduledFor'>;

type UpdateTaskDraftSessionProps = {
  request: Request;
  data: CreateTaskData;
  redirectTo: string;
};

export async function updateTaskDraftSession({
  request,
  data,
  redirectTo,
}: UpdateTaskDraftSessionProps) {
  const session = await getTaskDraftSession(request);

  session.set('taskDraft:body', data.body);
  session.set('taskDraft.scheduledFor', data.scheduledFor);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await taskDraftSessionStorage.commitSession(session),
    },
  });
}

type DestroyTaskDraftSessionProps = {
  request: Request;
  redirectTo: string;
};

export async function destroyTaskDraftSession({
  request,
  redirectTo = '/',
}: DestroyTaskDraftSessionProps) {
  const session = await getTaskDraftSession(request);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await taskDraftSessionStorage.destroySession(session),
    },
  });
}
