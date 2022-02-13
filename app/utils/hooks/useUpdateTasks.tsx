import { Task } from '@prisma/client';

import { useFetchers } from 'remix';

export function useUpdateTasks(
  action: string,
  tasks: Array<Task>,
  updateValue = ''
) {
  const fetchers = useFetchers();
  const updates: Array<Task> = [];

  fetchers.forEach((fetcher) => {
    if (fetcher.submission?.formData.get('_action') === action) {
      const taskId = fetcher.submission.formData.get('id');

      if (typeof taskId === 'string') {
        const task = tasks.find((t) => t.id === taskId);

        if (task) {
          updates.push({ ...task, scheduledFor: updateValue });
        }
      }
    }
  });

  return updates;
}
