/* eslint-disable no-restricted-syntax */
import { Task } from '@prisma/client';
import { format } from 'date-fns';
import { actionTypes } from '~/actions/actionTypes';

import { useParams } from 'remix';

import { useUpdateTasks } from '~/utils/hooks/useUpdateTasks';

import { TaskComponent } from './TaskComponent';

export default function DayTasksList({
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
    <div>
      <div className="shadow-md border-b min-h-[4rem] items-center flex px-4 mb-2">
        <h2 className="font-bold text-slate-600 text-xl">
          {format(new Date(day as string), 'iiii MMM, yyyy')}
        </h2>
      </div>
      {dayTasks.concat(updates).map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </div>
  );
}
