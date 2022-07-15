import { Task } from '@prisma/client';
import { useFetcher } from '@remix-run/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { actionTypes } from '~/actions/actionTypes';

import { TaskMenuDropdown } from '../TaskMenu';
import { CompleteTaskForm } from './CompleteTaskForm';
import { ScheduleTaskForm } from './ScheduleTaskForm';
import { UnscheduleTaskForm } from './UnscheduleTaskForm';
import { getActionType } from './utils';

export function TaskComponent({ task }: { task: Task }) {
  const fetcher = useFetcher();

  const { isScheduling, isUnscheduling } = getActionType(fetcher.submission);

  const isComplete = (): boolean => {
    const currentAction = fetcher.submission?.formData.get('_action');

    if (currentAction) {
      return currentAction === actionTypes.MARK_TASK_COMPLETE;
    }

    return task.isComplete;
  };

  return (
    <AnimatePresence>
      <motion.article
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-label={task.body}
        style={{ display: isScheduling || isUnscheduling ? 'none' : 'block' }}
        className={clsx('border  mb-2 flex flex-col', isComplete() ? '' : '')}
      >
        <div className="flex gap-2 flex-wrap items-center p-2 justify-between">
          {!task.scheduledFor ? (
            <ScheduleTaskForm task={task} fetcher={fetcher} />
          ) : null}
          <TaskMenuDropdown task={task} />
          {task.scheduledFor ? (
            <UnscheduleTaskForm task={task} fetcher={fetcher} />
          ) : null}
        </div>
        <CompleteTaskForm
          task={task}
          fetcher={fetcher}
          isComplete={isComplete}
        />
      </motion.article>
    </AnimatePresence>
  );
}
