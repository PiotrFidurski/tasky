import { actionTypes } from '~/rmx_actions/actionTypes';

import { format } from 'date-fns';

import { useParams } from '@remix-run/react';

import { useUpdateTasks } from '~/utils/hooks/useUpdateTasks';

import { JsonifiedTask } from '~/types';

import { TaskComponent } from './TaskComponent';

export function DayTasksList({
  dayTasks,
  unscheduledTasks,
}: {
  dayTasks: Array<JsonifiedTask>;
  unscheduledTasks: Array<JsonifiedTask>;
}) {
  const { day } = useParams<'day'>();

  const updates = useUpdateTasks({
    action: actionTypes.SCHEDULE_TASK,
    tasks: unscheduledTasks,
    updateValue: day,
  });

  return (
    <>
      <div className="min-h-[4rem] items-center flex mb-2">
        <h2 className="font-bold text-xl">
          {format(new Date(day as string), 'iiii MMM, yyyy')}
        </h2>
      </div>
      {dayTasks.concat(updates).map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </>
  );
}
