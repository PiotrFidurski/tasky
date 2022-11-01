import { LoaderArgs } from 'remix';

import {
  SessionFields,
  getTaskDraftSession,
} from '~/server/session/taskdraft.server';

export async function loader({ request }: LoaderArgs) {
  const createTaskDataSession = await getTaskDraftSession(request);

  const data = {
    body: createTaskDataSession.get(SessionFields.body) || '',
    scheduledFor: createTaskDataSession.get(SessionFields.scheduledFor) || '',
  };

  return data;
}

export type CreateTaskLoader = typeof loader;
