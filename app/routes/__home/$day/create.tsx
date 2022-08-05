import { LoaderArgs } from 'remix';

import { useLoaderData } from '@remix-run/react';

import { action } from '~/server/actions/createTask.server';
import { getTaskDraftSession } from '~/server/session/taskdraft.server';

import { CreateTask } from '~/components/Modals/CreateTask';

export { action };

export async function loader({ request }: LoaderArgs) {
  const createTaskDataSession = await getTaskDraftSession(request);

  const data = {
    body: createTaskDataSession.get('taskDraft:body') || '',
    scheduledFor: createTaskDataSession.get('taskDraft.scheduledFor') || '',
  };

  return data;
}

export default function CreateTaskRoute() {
  const draftData = useLoaderData<typeof loader>();

  return <CreateTask draft={draftData} />;
}
