import { Task } from '@prisma/client';
import { format } from 'date-fns';
import { actionTypes } from '~/actions/actionTypes';

import { useParams } from 'remix';

import { useUpdateTasks } from '~/utils/hooks/useUpdateTasks';

import { TaskComponent } from './TaskComponent';

export function DayTasksList({
  dayTasks,
  unscheduledTasks,
}: {
  dayTasks: Array<Task>;
  unscheduledTasks: Array<Task>;
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
        <h2 className="font-bold text-custom__gray text-xl dark:text-custom__ghostly">
          {format(new Date(day as string), 'iiii MMM, yyyy')}
        </h2>
      </div>
      {dayTasks.concat(updates).map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </>
  );
}
