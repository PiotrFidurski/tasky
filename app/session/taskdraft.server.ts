import { Task } from '@prisma/client';

import { createCookieSessionStorage, redirect } from 'remix';

export const taskDraftStorage = createCookieSessionStorage({
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

type UpdateDraftWithRedirectProps = {
  request: Request;
  data: CreateTaskData;
  redirectTo: string;
};

export async function updateTaskDraftSession({
  request,
  data,
  redirectTo,
}: UpdateDraftWithRedirectProps) {
  const session = await getTaskDraftSession(request);

  session.set('taskDraft:title', data.title);
  session.set('taskDraft:body', data.body);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await taskDraftStorage.commitSession(session),
    },
  });
}

type DestroyDraftWithRedirectProps = {
  request: Request;
  redirectTo: string;
};

export async function destroyDraftWithRedirect({
  request,
  redirectTo = '/',
}: DestroyDraftWithRedirectProps) {
  const session = await getTaskDraftSession(request);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await taskDraftStorage.destroySession(session),
    },
  });
}
