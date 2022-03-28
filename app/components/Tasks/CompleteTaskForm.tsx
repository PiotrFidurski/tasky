import clsx from 'clsx';
import { actionTypes } from '~/actions/actionTypes';

import { CheckmarkIcon } from '../Icons/CheckmarkIcon';
import { ComponentWithFetcherProps } from './types';

export function CompleteTaskForm({ task, fetcher }: ComponentWithFetcherProps) {
  const isComplete = (): boolean => {
    const currentAction = fetcher.submission?.formData.get('_action');

    if (currentAction) {
      return currentAction === actionTypes.MARK_TASK_COMPLETE;
    }

    return task.isComplete;
  };
  return (
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
  );
}
