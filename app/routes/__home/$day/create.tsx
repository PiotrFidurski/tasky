import { LoaderArgs } from 'remix';

import { useLoaderData } from '@remix-run/react';

import { getTaskDraftSession } from '~/session/taskdraft.server';

import { CreateTask } from '~/components/Modals/CreateTask';

import { action } from '~/actions/createTask.server';

export { action };

export async function loader({ request }: LoaderArgs) {
  const createTaskDataSession = await getTaskDraftSession(request);

  const data = {
    title: createTaskDataSession.get('taskDraft:title') || '',
    body: createTaskDataSession.get('taskDraft:body') || '',
  };

  return data;
}

export default function CreateTaskRoute() {
  const draftData = useLoaderData<typeof loader>();

  return <CreateTask draft={draftData} />;
}
