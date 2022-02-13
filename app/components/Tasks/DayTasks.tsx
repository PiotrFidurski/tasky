/* eslint-disable no-restricted-syntax */
import { Task } from '@prisma/client';
import { actionTypes } from '~/actions/actionTypes';

import { useParams } from 'remix';

import { useUpdateTasks } from './Backlog';
import { TaskComponent } from './TaskComponent';

export default function DayTasks({
  dayTasks,
  backlog,
}: {
  dayTasks: Array<Task>;
  backlog: Array<Task>;
}) {
  const { day } = useParams<'day'>();

  const updates = useUpdateTasks(actionTypes.SCHEDULE_TASK, backlog, day);

  return (
    <div>
      <div className="shadow-md border-b min-h-[4rem] items-center flex px-4 mb-2">
        <h2 className="font-bold text-slate-600 text-xl">{day}</h2>
      </div>
      {dayTasks.concat(updates).map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </div>
  );
}
