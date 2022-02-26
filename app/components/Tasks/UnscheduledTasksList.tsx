import { Task } from '@prisma/client';
import { actionTypes } from '~/actions/actionTypes';

import { useUpdateTasks } from '~/utils/hooks/useUpdateTasks';

import { TaskComponent } from './TaskComponent';

export function UnscheduledTasksList({
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
      <div className="min-h-[4rem] items-center flex mb-2">
        <h2 className="font-bold text-custom__gray text-xl dark:text-custom__ghostly">
          Unscheduled
        </h2>
      </div>
      {unscheduledTasks.concat(updates).map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </>
  );
}
