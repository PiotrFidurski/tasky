import { Task } from '@prisma/client';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { useFetcher } from 'remix';

import { TaskMenuDropdown } from '../TaskMenu';
import { CompleteTaskForm } from './CompleteTaskForm';
import { ScheduleTaskForm } from './ScheduleTaskForm';
import { UnscheduleTaskForm } from './UnscheduleTaskForm';
import { getActionType } from './utils';

export function TaskComponent({ task }: { task: Task }) {
  const fetcher = useFetcher();

  const { isScheduling, isUnscheduling } = getActionType(fetcher.submission);

  return (
    <AnimatePresence>
      <motion.article
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-label={task.body}
        style={{ display: isScheduling || isUnscheduling ? 'none' : 'block' }}
        className={clsx(
          'border dark:border-custom__hoverdark mb-2 flex flex-col'
        )}
      >
        <div className="flex gap-2 flex-wrap items-center p-2 dark:border-custom__hoverdark justify-between">
          {!task.scheduledFor ? (
            <ScheduleTaskForm task={task} fetcher={fetcher} />
          ) : null}
          <TaskMenuDropdown task={task} />
          {task.scheduledFor ? (
            <UnscheduleTaskForm task={task} fetcher={fetcher} />
          ) : null}
        </div>
        <CompleteTaskForm task={task} fetcher={fetcher} />
      </motion.article>
    </AnimatePresence>
  );
}
