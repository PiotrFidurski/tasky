import { Task } from '@prisma/client';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { actionTypes } from '~/actions/actionTypes';

import { useFetcher, useParams } from 'remix';

import { formatDate } from '~/utils/date';

import { ArrowleftIcon } from '../Icons/ArrowleftIcon';
import { ArrowrightIcon } from '../Icons/ArrowrightIcon';
import { CheckmarkIcon } from '../Icons/CheckmarkIcon';
import { TaskMenuDropdown } from '../TaskMenu';
import { Tag } from './Tag';

export function TaskComponent({ task }: { task: Task }) {
  const fetcher = useFetcher();

  const { day } = useParams<'day'>();

  const isComplete = (): boolean => {
    const currentAction = fetcher.submission?.formData.get('_action');

    if (currentAction) {
      return currentAction === actionTypes.MARK_TASK_COMPLETE;
    }

    return task.isComplete;
  };

  const isScheduling =
    fetcher.submission?.formData.get('_action') === actionTypes.SCHEDULE_TASK;
  const isUnscheduling =
    fetcher.submission?.formData.get('_action') === actionTypes.UNSCHEDULE_TASK;

  return (
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
      {/* Task header */}
      <div className="flex gap-2 flex-wrap items-center p-2 border-b dark:border-custom__hoverdark">
        {!task.scheduledFor ? (
          <fetcher.Form method="post">
            <input
              name="_action"
              value={actionTypes.SCHEDULE_TASK}
              type="hidden"
            />
            <input
              name="date"
              value={!day ? formatDate() : day}
              type="hidden"
            />
            <input name="id" value={task.id} type="hidden" />
            <button
              type="submit"
              aria-label="schedule task"
              className="p-1 text-custom__gray dark:text-custom__ghostly"
            >
              <ArrowleftIcon />
            </button>
          </fetcher.Form>
        ) : null}
        {/* todo */}
        <Tag className="bg-red-400">important</Tag>
        <Tag className="bg-blue-400">debug</Tag>
        <Tag className="bg-purple-400">life</Tag>
        <Tag className="bg-yellow-400">dogs</Tag>
        <Tag className="bg-green-400">cats</Tag>
        <Tag className="bg-orange-400">immediate</Tag>
        <TaskMenuDropdown task={task} />
        {task.scheduledFor ? (
          <fetcher.Form method="post">
            <input
              name="_action"
              value={actionTypes.UNSCHEDULE_TASK}
              type="hidden"
            />
            <input name="id" value={task.id} type="hidden" />
            <button
              type="submit"
              aria-label="unschedule task"
              className="text-custom__gray dark:text-custom__ghostly p-1 transform rotate-180"
            >
              <ArrowrightIcon />
            </button>
          </fetcher.Form>
        ) : null}
      </div>
      <div
        className={clsx(
          isComplete() ? 'bg-blue-100 dark:bg-blue-900' : 'bg-transparent',
          'flex items-start gap-2 p-2'
        )}
      >
        <fetcher.Form method="post">
          <input
            name="_action"
            value={
              isComplete()
                ? actionTypes.MARK_TASK_INCOMPLETE
                : actionTypes.MARK_TASK_COMPLETE
            }
            type="hidden"
          />
          <input name="id" value={task.id} type="hidden" />
          <button
            type="submit"
            aria-label={isComplete() ? 'uncomplete task' : 'complete task'}
            className="rounded-full text-custom__gray dark:text-custom__ghostly border-2 border-custom__gray dark:border-custom__ghostly"
          >
            {isComplete() ? <CheckmarkIcon /> : <div className="w-8 h-8" />}
          </button>
        </fetcher.Form>
        <p className="font-semibold text-custom__gray dark:text-custom__ghostly">
          {task.body}
        </p>
      </div>
    </motion.article>
  );
}
