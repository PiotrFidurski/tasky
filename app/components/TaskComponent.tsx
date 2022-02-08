import { Task } from '@prisma/client';
import { format } from 'date-fns';

import { Link, useFetcher } from 'remix';

function TaskComponent({ task }: { task: Task }) {
  const fetcher = useFetcher();

  return (
    <article
      aria-label={task.body}
      className={`${
        task.isComplete ? 'bg-blue-100' : ''
      } py-4 px-2 shadow-md mb-2 rounded flex items-center justify-between`}
    >
      <div className="flex items-center gap-2">
        <fetcher.Form method="post">
          <input
            name="_action"
            value={task.isComplete ? 'uncomplete' : 'complete'}
            type="hidden"
          />
          <input name="id" value={task.id} type="hidden" />
          <button
            type="submit"
            aria-label={task.isComplete ? 'uncomplete task' : 'complete task'}
            className="rounded-full border-2 border-slate-600 text-blue-600 align-bottom"
          >
            {/* checkmark icon */}
            {task.isComplete ? (
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
            <input name="_action" value="assignToDate" type="hidden" />
            {/* sending formatted date as input value */}
            <input
              name="date"
              value={format(new Date(), 'yyyy-MM-dd')}
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

        <Link className="font-semibold text-slate-600" to={`/home/${task.id}`}>
          {task.body}
        </Link>
      </div>
      <button
        type="button"
        aria-label="delete task"
        className="uppercase font-bold text-slate-600"
      >
        {/* trash icon */}
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
      </button>
      {task.scheduledFor ? (
        <fetcher.Form method="post">
          <input name="_action" value="unassignFromDate" type="hidden" />
          <input name="id" value={task.id} type="hidden" />
          <button
            type="submit"
            aria-label="move to backlog"
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
