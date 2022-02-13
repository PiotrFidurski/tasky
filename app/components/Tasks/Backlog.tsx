import { Task } from '@prisma/client';
import { actionTypes } from '~/actions/actionTypes';

import { useFetchers } from 'remix';

import { TaskComponent } from './TaskComponent';

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

export default function Backlog({
  backlog,
  dayTasks,
}: {
  backlog: Array<Task>;
  dayTasks: Array<Task>;
}) {
  const updates = useUpdateTasks(actionTypes.UNSCHEDULE_TASK, dayTasks, '');

  return (
    <>
      <div className="shadow-md border-b min-h-[4rem] items-center flex px-4 mb-2">
        <h2 className="font-bold text-slate-600 text-xl">Backlog</h2>
      </div>
      {backlog.concat(updates).map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </>
  );
}
