import { Task } from '@prisma/client';
import clsx from 'clsx';
import { actionTypes } from '~/actions/actionTypes';

import { useFetcher, useParams } from 'remix';

import { formatDate } from '~/utils/date';

import Tag from './Tag';

function TaskComponent({ task }: { task: Task }) {
  const fetcher = useFetcher();

  const { day } = useParams<'day'>();

  const isComplete = () => {
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
    <article
      style={{ display: isScheduling || isUnscheduling ? 'none' : 'flex' }}
      aria-label={task.body}
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
              className="p-1 text-blue-600"
            >
              {/* arrow icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
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
              className="text-blue-600 p-1 transform rotate-180"
            >
              {/* arrow icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
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
                ? actionTypes.MARK_TASK_UNCOMPLETE
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
            {/* checkmark icon */}
            {isComplete() ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <div className="w-8 h-8" />
            )}
          </button>
        </fetcher.Form>

        <p className="font-semibold text-custom__gray dark:text-custom__ghostly">
          {task.body}
        </p>
      </div>
    </article>
  );
}

export { TaskComponent };
