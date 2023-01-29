import { useFetcher } from 'remix';

import { actionTypes } from '~/server/actions/actionTypes';

export function useDeleteTask({
  taskId,
  userId,
}: {
  taskId: string;
  userId: string;
}) {
  const fetcher = useFetcher();

  const handleDeleteTask = () => {
    fetcher.submit(
      { _action: actionTypes.DELETE_TASK, id: taskId, ownerId: userId },
      { method: 'post' }
    );
  };

  return { handleDeleteTask };
}
