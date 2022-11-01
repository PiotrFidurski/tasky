import { LoaderArgs } from 'remix';

import { getTaskDraftSession } from '~/server/session/taskdraft.server';

export async function loader({ request }: LoaderArgs) {
  const createTaskDataSession = await getTaskDraftSession(request);

  const data = {
    body: createTaskDataSession.get('taskDraft:body') || '',
    scheduledFor: createTaskDataSession.get('taskDraft:scheduledFor') || '',
  };

  return data;
}

export type CreateTaskLoader = typeof loader;
