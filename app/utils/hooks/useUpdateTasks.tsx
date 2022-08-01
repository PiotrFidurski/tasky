import { useFetchers } from '@remix-run/react';

import { JsonifiedTask } from '~/types';

type UpdateTaskProps = {
  action: string;
  tasks: Array<JsonifiedTask>;
  updateValue?: string;
};

export function useUpdateTasks({
  action,
  tasks,
  updateValue = '',
}: UpdateTaskProps) {
  const fetchers = useFetchers();
  const updates: Array<JsonifiedTask> = [];

  fetchers.forEach((fetcher) => {
    if (fetcher.submission?.formData.get('_action') === action) {
      const taskId = fetcher.submission.formData.get('id');

      if (typeof taskId === 'string') {
        const task = tasks.find((t) => t.id === taskId);

        if (task) {
          const updatedTask = {
            ...task,
            scheduledFor: updateValue,
            sortDate: new Date().toISOString(),
          };

          updates.push(updatedTask);
        }
      }
    }
  });

  return updates;
}
