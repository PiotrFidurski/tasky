import { Task } from '@prisma/client';
import { actionTypes } from '~/actions/actionTypes';

import { useFetcher, useParams } from 'remix';

import { formatDate } from '~/utils/date';

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
      className={`${
        isComplete() ? 'bg-blue-100' : ''
      } py-4 px-2 shadow-md mb-2 rounded flex items-center justify-between`}
    >
      <div className="flex items-center gap-2">
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
            className="rounded-full border-2 border-slate-600 text-blue-600 align-bottom"
          >
            {/* checkmark icon */}
            {isComplete() ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              <div className="w-5 h-5" />
            )}
          </button>
        </fetcher.Form>
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
              aria-label="move to day!"
              className="text-blue-600 align-bottom"
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
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
            </button>
          </fetcher.Form>
        ) : null}
        <p className="font-semibold text-slate-600">{task.body}</p>
      </div>
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
            aria-label="move to unscheduled"
            className="text-blue-600 align-bottom transform rotate-180"
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
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </button>
        </fetcher.Form>
      ) : null}
    </article>
  );
}

export { TaskComponent };
