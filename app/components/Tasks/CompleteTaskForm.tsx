import { actionTypes } from '~/actions/actionTypes';

import { CheckmarkIcon } from '../Icons/CheckmarkIcon';
import { ComponentWithFetcherProps } from './types';

export function CompleteTaskForm({
  task,
  fetcher,
  isComplete,
}: ComponentWithFetcherProps<unknown> & { isComplete: () => boolean }) {
  return (
    <div className="flex items-start gap-2 p-2 bg-transparent">
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
          {isComplete() ? <CheckmarkIcon /> : <div className="h-6 w-6" />}
        </button>
      </fetcher.Form>
      <p className="font-semibold text-custom__gray dark:text-custom__ghostly">
        {task.body}
      </p>
    </div>
  );
}
