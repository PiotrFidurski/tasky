import { Task } from '@prisma/client';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { actionTypes } from '~/actions/actionTypes';

import { Link, useFetcher, useLocation, useMatches, useParams } from 'remix';

import { formatDate } from '~/utils/date';

import { Button } from '../Elements/Button';
import Tag from './Tag';

function TaskComponent({ task }: { task: Task }) {
  const fetcher = useFetcher();
  const location = useLocation();

  const allRouteData = useMatches();

  const routeData = allRouteData.find(
    (route) => route.pathname === location.pathname
  );

  const currentUserId = routeData?.data?.userId;

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
              className="text-custom__gray dark:text-custom__ghostly p-1 transform rotate-180"
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
      {currentUserId === task.userId ? (
        <div className="p-1 flex gap-4 items-center">
          <fetcher.Form method="post">
            <input
              name="_action"
              value={actionTypes.DELETE_TASK}
              type="hidden"
            />
            <input name="id" value={task.id} type="hidden" />
            <input name="ownerId" value={task.userId} type="hidden" />
            <Button
              type="submit"
              isGhost
              className="text-rose-600 border-rose-600 rounded-full p-1 hover:bg-rose-600 hover:border-rose-600"
              aria-label="delete task"
            >
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </Button>
          </fetcher.Form>
          <Link to={`${task.id}/edit`}>
            <Button
              type="submit"
              isGhost
              className="text-green-600 border-green-600 rounded-full p-1 hover:bg-green-600 hover:border-green-600"
              aria-label="update task"
            >
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </Button>
          </Link>
        </div>
      ) : null}
    </motion.article>
  );
}

export { TaskComponent };
