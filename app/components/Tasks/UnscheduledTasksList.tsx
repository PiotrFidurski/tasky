import { actionTypes } from '~/rmx_actions/actionTypes';

import { useUpdateTasks } from '~/utils/hooks/useUpdateTasks';

import { JsonifiedTask } from '~/types';

import { TaskComponent } from './TaskComponent';

export function UnscheduledTasksList({
  unscheduledTasks,
  dayTasks,
}: {
  dayTasks: Array<JsonifiedTask>;
  unscheduledTasks: Array<JsonifiedTask>;
}) {
  const updates = useUpdateTasks({
    action: actionTypes.UNSCHEDULE_TASK,
    tasks: dayTasks,
  });

  return (
    <>
      <div className="min-h-[4rem] items-center flex mb-2">
        <h2 className="font-bold text-xl">Unscheduled</h2>
      </div>
      {unscheduledTasks.concat(updates).map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </>
  );
}
