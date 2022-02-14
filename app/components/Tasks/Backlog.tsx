import { Task } from '@prisma/client';
import { actionTypes } from '~/actions/actionTypes';

import { useUpdateTasks } from '~/utils/hooks/useUpdateTasks';
import { sortByDate } from '~/utils/sortByDate';

import { TaskComponent } from './TaskComponent';

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
      {backlog
        .concat(updates)
        .sort(sortByDate)
        .map((task) => (
          <TaskComponent key={task.id} task={task} />
        ))}
    </>
  );
}
