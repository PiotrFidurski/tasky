import { Task } from '@prisma/client';

import { useFetchers } from 'remix';

type UpdateTaskProps = {
  action: string;
  tasks: Array<Task>;
  updateValue?: string;
};

export function useUpdateTasks({
  action,
  tasks,
  updateValue = '',
}: UpdateTaskProps) {
  const fetchers = useFetchers();
  const updates: Array<Task> = [];

  fetchers.forEach((fetcher) => {
    if (fetcher.submission?.formData.get('_action') === action) {
      const taskId = fetcher.submission.formData.get('id');

      if (typeof taskId === 'string') {
        const task = tasks.find((t) => t.id === taskId);

        if (task) {
          const updatedTask = {
            ...task,
            scheduledFor: updateValue,
            sortDate: new Date(),
          };

          updates.push(updatedTask);
        }
      }
    }
  });

  return updates;
}
