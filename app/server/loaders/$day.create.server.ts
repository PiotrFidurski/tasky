import { LoaderArgs } from 'remix';

import {
  DraftSessionFields,
  getTaskDraftSession,
} from '~/server/session/taskdraft.server';

export async function loader({ request }: LoaderArgs) {
  const createTaskDataSession = await getTaskDraftSession(request);

  const data = {
    body: createTaskDataSession.get(DraftSessionFields.body) || '',
    scheduledFor:
      createTaskDataSession.get(DraftSessionFields.scheduledFor) || '',
  };

  return data;
}

export type CreateTaskLoader = typeof loader;
