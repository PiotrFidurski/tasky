import { Task } from '@prisma/client';
import { actionTypes } from '~/actions/actionTypes';

import { useUpdateTasks } from '~/utils/hooks/useUpdateTasks';

import { TaskComponent } from './TaskComponent';

export default function UnscheduledTasksList({
  unscheduledTasks,
  dayTasks,
}: {
  dayTasks: Array<Task>;
  unscheduledTasks: Array<Task>;
}) {
  const updates = useUpdateTasks({
    action: actionTypes.UNSCHEDULE_TASK,
    tasks: dayTasks,
  });

  return (
    <>
      <div className="shadow-md border-b min-h-[4rem] items-center flex px-4 mb-2">
        <h2 className="font-bold text-slate-600 text-xl">Unscheduled</h2>
      </div>
      {unscheduledTasks.concat(updates).map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </>
  );
}
